const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const auth = require("./authentication");
const Admin = require("./Adminmodel");
const User = require("./Usermodel");  // Update to Admin model



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Specify the directory where uploaded files should be stored
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); // Use the original file name
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
//     }
// }).single('storeImage'); // Expect a single file with the field name 'storeImage'

// module.exports = upload;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Initialize Cloudinary
cloudinary.config({
  cloud_name: 'djxbzcayc',
  api_key: '177435834375344',
  api_secret: 'VC8o4lQSa551ADbsUtPtV3jIaO4'
});

// Multer upload middleware
const upload = multer({ storage: storage }).single('storeImage');

// Multer error handler middleware
router.use(function(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err);
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum 5MB allowed.' });
    } else {
      return res.status(400).json({ error: 'File upload error' });
    }
  } else if (err) {
    console.error('Unknown error:', err);
    res.status(500).json({ error: 'Internal server error' });
  } else {
    next(); // No multer error, continue to next middleware
  }
});


router.post("/Adminregister", async (req, res) => {
  upload(req, res, async (err) => {
      if (err) {
          console.error('Multer error:', err);
          return res.status(400).json({ error: 'File upload error' });
      }

      try {
          const { name, email, password, storeName, storeAddress, contactNumber, storeHours } = req.body;

          // Validate request body
          if (!name || !email || !password || !storeName || !storeAddress || !contactNumber || !storeHours) {
              return res.status(400).json({ error: `Please enter all the required fields.` });
          }

          // Other validation checks...
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
  
      // Regular expression to validate Indian mobile number format
      const mobileNumberRegEx = /^[6-9]\d{9}$/;
      if (!mobileNumberRegEx.test(contactNumber)) {
          return res.status(400).json({ error: "Please enter a valid Indian mobile number." });
      }

        const doesAdminExist = await Admin.findOne({ $or: [{ email }, { contactNumber }] });
     try{
        if (doesAdminExist) {
            if (doesAdminExist.email === email) {
                return res.status(400).json({
                    error: `An admin with email ${email} already exists. Please use a different email.`,
                });
            } else {
                return res.status(400).json({
                    error: `An admin with contact number ${contactNumber} already exists. Please use a different contact number.`,
                });
            }
        }}catch(err){

        }
      

        const hashedPassword = await bcrypt.hash(password, 12);


          // Upload image to Cloudinary
          const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);

          // Create new Admin instance with image URL
          const newAdmin = new Admin({
              name,
              email,
              password: hashedPassword,
              storeName,
              storeAddress,
              contactNumber,
              storeHours,
              storeImage: cloudinaryResponse.url // Save image URL to database
          });

          const result = await newAdmin.save();
          result._doc.password = undefined;

          return res.status(201).json({ ...result._doc });
      } catch (err) {
          console.error('Error occurred during registration:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }
  });
});



// router.post("/Adminregister", async (req, res) => {
//     const { name, email, password, storeName, storeAddress, contactNumber } = req.body;
  
//     if (!name || !email || !password || !storeName || !storeAddress || !contactNumber) {
//       return res.status(400).json({ error: `Please enter all the required fields.` });
//     }
  
//     if (name.length > 25) {
//       return res.status(400).json({ error: "Name can only be less than 25 characters" });
//     }
  
//     const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailReg.test(email)) {
//       return res.status(400).json({ error: "Please enter a valid email address." });
//     }
  
//     if (password.length < 6) {
//       return res.status(400).json({ error: "Password must be at least 6 characters long" });
//     }
  
//     // Regular expression to validate Indian mobile number format
//     const mobileNumberRegEx = /^[6-9]\d{9}$/;
//     if (!mobileNumberRegEx.test(contactNumber)) {
//       return res.status(400).json({ error: "Please enter a valid Indian mobile number." });
//     }
  
//     try {
//       const doesAdminAlreadyExist = await Admin.findOne({ email });
  
//       if (doesAdminAlreadyExist) {
//         return res.status(400).json({
//           error: `An admin with email ${email} already exists. Please use a different email.`,
//         });
//       }
  
//       const hashedPassword = await bcrypt.hash(password, 12);
//       const newAdmin = new Admin({ name, email, password: hashedPassword, storeName, storeAddress, contactNumber });
  
//       const result = await newAdmin.save();
//       result._doc.password = undefined;
  
//       return res.status(201).json({ ...result._doc });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ error: err.message });
//     }
//   });

// router.post("/Adminregister", async (req, res) => {
//     const { name, email, password, storeName, storeAddress, contactNumber } = req.body;
  
//     if (!name || !email || !password || !storeName || !storeAddress || !contactNumber) {
//         return res.status(400).json({ error: `Please enter all the required fields.` });
//     }
  
//     if (name.length > 25) {
//         return res.status(400).json({ error: "Name can only be less than 25 characters" });
//     }
  
//     const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailReg.test(email)) {
//         return res.status(400).json({ error: "Please enter a valid email address." });
//     }
  
//     if (password.length < 6) {
//         return res.status(400).json({ error: "Password must be at least 6 characters long" });
//     }
  
//     // Regular expression to validate Indian mobile number format
//     const mobileNumberRegEx = /^[6-9]\d{9}$/;
//     if (!mobileNumberRegEx.test(contactNumber)) {
//         return res.status(400).json({ error: "Please enter a valid Indian mobile number." });
//     }

//     try {
//         const doesAdminExist = await Admin.findOne({ $or: [{ email }, { contactNumber }] });

//         if (doesAdminExist) {
//             if (doesAdminExist.email === email) {
//                 return res.status(400).json({
//                     error: `An admin with email ${email} already exists. Please use a different email.`,
//                 });
//             } else {
//                 return res.status(400).json({
//                     error: `An admin with contact number ${contactNumber} already exists. Please use a different contact number.`,
//                 });
//             }
//         }

//         const hashedPassword = await bcrypt.hash(password, 12);
//         const newAdmin = new Admin({ name, email, password: hashedPassword, storeName, storeAddress, contactNumber });

//         const result = await newAdmin.save();
//         result._doc.password = undefined;

//         return res.status(201).json({ ...result._doc });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: err.message });
//     }
// });

  

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


router.post("/UserRegister", async (req, res) => {
  try {
      const { name, email, password, contactNumber, address } = req.body;

      // Validate request body
      if (!name || !email || !password || !contactNumber || !address) {
          return res.status(400).json({ error: `Please enter all the required fields.` });
      }

      // Other validation checks...
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

      // Regular expression to validate Indian mobile number format
      const mobileNumberRegEx = /^[6-9]\d{9}$/;
      if (!mobileNumberRegEx.test(contactNumber)) {
          return res.status(400).json({ error: "Please enter a valid Indian mobile number." });
      }

      const doesUserExist = await User.findOne({ email });
      if (doesUserExist) {
          return res.status(400).json({ error: "User with this email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      // Create new User instance
      const newUser = new User({
          name,
          email,
          password: hashedPassword,
          contactNumber,
          address
      });

      // Save user to database
      const result = await newUser.save();
      result.password = undefined;

      return res.status(201).json(result);
  } catch (err) {
      console.error('Error occurred during registration:', err);
      return res.status(500).json({ error: 'Internal server error' });
  }
});


router.post("/Userlogin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter all the required fields!" });
  }

  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailReg.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) {
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    const payload = { _id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userData = { ...user._doc, password: undefined };
    return res.status(200).json({ token, user: userData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

router.get('/admin/:adminid', async (req, res) => {
  const adminid = req.params.adminid;
  try {
    const admin = await Admin.findOne({ adminid: adminid });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;