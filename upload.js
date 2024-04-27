// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const Product = require('./addproduct.js'); // Import the Product model/schema

// const router = express.Router();

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Destination folder for uploaded images
//   },
//   filename: function (req, file, cb) {
//     // Generate a unique filename by appending the current timestamp and original file extension
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage }).single('image');

// // Multer error handler middleware
// router.use(function(err, req, res, next) {
//   if (err instanceof multer.MulterError) {
//     // A Multer error occurred when uploading
//     console.error('Multer error:', err);
//     res.status(400).json({ error: 'File upload error' });
//   } else {
//     // An unknown error occurred
//     console.error('Unknown error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Upload endpoint
// // router.post('/upload', (req, res) => {
// //   upload(req, res, async (err) => {
// //     if (err) {
// //       // Multer middleware encountered an error
// //       console.error('Multer error:', err);
// //       return res.status(400).json({ error: 'File upload error' });
// //     }
    
// //     // Image uploaded successfully, continue with product creation
// //     try {
// //       const { title, price, description, quantity } = req.body;
// //       const image = req.file.filename;
// //       const product = new Product({ title, price, description, quantity, image });
// //       await product.save();
// //       res.status(200).json({ message: 'Product added successfully' });
// //     } catch (error) {
// //       console.error('Error occurred while adding product:', error);
// //       res.status(500).json({ error: 'Internal server error' });
// //     }
// //   });
// // });

// // Upload endpoint
// router.post('/upload', (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       // Multer middleware encountered an error
//       console.error('Multer error:', err);
//       return res.status(400).json({ error: 'File upload error' });
//     }

//     // File uploaded successfully, proceed with handling other form data
//     try {
//       const { title, price, description, quantity } = req.body;
//       const image = req.file.filename;

//       const product = new Product({
//         title,
//         price,
//         description,
//         quantity,
//         image
//       });

//       await product.save();

//       res.status(200).json({ message: 'Product added successfully' });
//     } catch (error) {
//       console.error('Error occurred while adding product:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
// });


// module.exports = router;



const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('./addproduct.js'); // Import the Product model/schema

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    // Generate a unique filename by appending the current timestamp and original file extension
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Configure multer limits
const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB file size limit
};

// Configure multer file type filter
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'));
  }
};

const upload = multer({ 
  storage: storage,
  limits: limits,
  fileFilter: fileFilter
}).single('image');

// Multer error handler middleware
router.use(function(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading
    console.error('Multer error:', err);
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum 5MB allowed.' });
    } else {
      return res.status(400).json({ error: 'File upload error' });
    }
  } else if (err) {
    // An unknown error occurred
    console.error('Unknown error:', err);
    res.status(500).json({ error: 'Internal server error' });
  } else {
    next(); // No multer error, continue to next middleware
  }
});

// Upload endpoint
router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      // Multer middleware encountered an error
      console.error('Multer error:', err);
      return res.status(400).json({ error: 'File upload error' });
    }

    // File uploaded successfully, proceed with handling other form data
    try {
      const { title, price, description, quantity } = req.body;
      const image = req.file.filename;

      const product = new Product({
        title,
        price,
        description,
        quantity,
        image
      });

      await product.save();

      res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
      console.error('Error occurred while adding product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

module.exports = router;



