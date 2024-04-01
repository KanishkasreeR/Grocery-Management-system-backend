const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {Customer} = require('./customerSchema')
const {Admin} = require('./adminSchema')


router.post("/customer/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res
      .status(400)
      .json({ error: `Please enter all the required fields.` });


  if (name.length > 25)
    return res
      .status(400)
      .json({ error: "Name can only be less than 25 characters" });


  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });


  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });

  try {
    const doesCustomerAlreadyExist = await Customer.findOne({ email });

    if (doesCustomerAlreadyExist)
      return res.status(400).json({
        error: `A customer with that email [${email}] already exists. Please try another one.`,
      });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newCustomer = new Customer({ name, email, password: hashedPassword });

    const result = await newCustomer.save();

    result._doc.password = undefined;

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/admin/register", async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ error: `Please enter all the required fields.` });
  
    if (name.length > 25)
      return res
        .status(400)
        .json({ error: "Name can only be less than 25 characters" });

    const emailReg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if (!emailReg.test(email))
      return res
        .status(400)
        .json({ error: "Please enter a valid email address." });

    if (password.length < 6)
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
  
    try {
      const doesAdminAlreadyExist = await Admin.findOne({ email });
  
      if (doesAdminAlreadyExist)
        return res.status(400).json({
          error: `An admin with that email [${email}] already exists. Please try another one.`,
        });
  
      const hashedPassword = await bcrypt.hash(password, 12);
      const newAdmin = new Admin({ name, email, password: hashedPassword });
  
      const result = await newAdmin.save();
  
      result._doc.password = undefined;
  
      return res.status(201).json({ ...result._doc });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  });

  
  
