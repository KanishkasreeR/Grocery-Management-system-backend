const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');

require("dotenv").config({path : "./config2.env"})
const auth = require("./authentication");
const Admin = require("./Adminmodel");
const User = require("./Usermodel");  // Update to Admin model
const Order = require('./OrderSchema');



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

router.get('/admin', async (req, res) => {
  try {
    const { adminId } = req.query; // Get adminId from query parameters

    // Check if adminId is provided
    if (!adminId) {
      return res.status(400).json({ error: 'Admin ID is required' });
    }

    const admin = await Admin.findById(adminId); // Retrieve admin details for the specified adminId
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({ admin });
  } catch (error) {
    console.error('Error occurred while retrieving admin details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/customer', async (req, res) => {
  try {
    const { customerId } = req.query; // Get customerId from query parameters

    // Check if customerId is provided
    if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    const customer = await User.findById(customerId); // Retrieve customer details for the specified customerId
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json({ customer });
  } catch (error) {
    console.error('Error occurred while retrieving customer details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/admins', async (req, res) => {
  try {
    // Fetch all admins from the database
    const admins = await Admin.find();
    res.status(200).json(admins); // Respond with the admins in JSON format
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ error: 'Internal server error' }); // Respond with an error if something goes wrong
  }
});

router.get('/admin/:adminId', async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json({ admin });
  } catch (error) {
    console.error('Error fetching admin details:', error);
    res.status(500).json({ error: 'Failed to fetch admin details' });
  }
});

router.get('/getcustomer', async (req, res) => {
  const { customerId } = req.query;

  try {
      console.log(`Fetching customer details for customerId: ${customerId}`);
      const customer = await User.findById(customerId);
      console.log(`Fetched customer: ${JSON.stringify(customer)}`);

      if (!customer) {
          console.log(`No customer found with customerId: ${customerId}`);
          return res.status(404).json({ message: 'Customer not found' });
      }

      res.status(200).json(customer);
  } catch (error) {
      console.error('Error fetching customer details:', error);
      res.status(500).json({ message: 'Failed to fetch customer details', error });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Please enter your email address.' });
    }

    let user = await User.findOne({ email });
    let userType = 'user';

    if (!user) {
      user = await Admin.findOne({ email });
      userType = 'admin';
    }

    if (!user) {
      return res.status(400).json({ error: 'No user found with this email address.' });
    }

    const token = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Instead of sending an email, return the token in the response
    res.status(200).json({ resetToken: token, message: 'Password reset token generated.', userType });
  } catch (err) {
    console.error('Error in forgot-password:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: 'Please provide the reset token and new password.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    let user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      user = await Admin.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });
    }

    if (!user) {
      return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({ message: 'Password has been reset.' });
  } catch (err) {
    console.error('Error in reset-password:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;