const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("./authentication");
const Admin = require("./Adminmodel"); // Update to Admin model

// Register Route
router.post("/Adminregister", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: `Please enter all the required fields.` });
  }

  if (name.length > 25) {
    return res.status(400).json({ error: "Name can only be less than 25 characters" });
  }

  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailReg.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long" });
  }

  try {
    const doesAdminAlreadyExist = await Admin.findOne({ email });

    if (doesAdminAlreadyExist) {
      return res.status(400).json({
        error: `An admin with email ${email} already exists. Please use a different email.`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = new Admin({ name, email, password: hashedPassword });

    const result = await newAdmin.save();
    result._doc.password = undefined;

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// Login Route
router.post("/Adminlogin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter all the required fields!" });
  }

  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailReg.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    const doesPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!doesPasswordMatch) {
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    const payload = { _id: admin._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const adminData = { ...admin._doc, password: undefined };
    return res.status(200).json({ token, admin: adminData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/me", auth, async (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});

module.exports = router;
