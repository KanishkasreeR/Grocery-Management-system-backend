// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const app = express();

// // Set up multer storage engine
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Destination folder for uploaded images
//   },
//   filename: function (req, file, cb) {
//     // Generate a unique filename by appending the current timestamp and original file extension
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Initialize multer with the configured storage engine
// const upload = multer({ storage: storage });

// // POST endpoint to handle file uploads
// app.post('/upload', upload.single('image'), (req, res) => {
//   // If the file is successfully uploaded, send a success response
//   res.status(200).json({ message: 'File uploaded successfully' });
// });

// module.exports = app;

// const express = require('express');
// const multer = require('multer');
// const router = express.Router();

// // Set up multer storage engine
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Destination folder for uploaded images
//   },
//   filename: function (req, file, cb) {
//     // Generate a unique filename by appending the current timestamp and original file extension
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Initialize multer with the configured storage engine
// const upload = multer({ storage: storage });

// // POST endpoint to handle file uploads
// router.post('/upload', upload.single('image'), (req, res) => {
//   // If the file is successfully uploaded, send a success response
//   res.status(200).json({ message: 'File uploaded successfully' });
// });

// module.exports = router;

// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const Product = require('./addproduct'); // Import the Product model/schema

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

// const upload = multer({ storage: storage });

// // Upload endpoint
// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     // Image uploaded successfully, save product data to database
//     const { title, price, description, quantity } = req.body;
//     const image = req.file.filename;

//     const product = new Product({
//       title,
//       price,
//       description,
//       quantity,
//       image
//     });

//     await product.save();

//     res.status(200).json({ message: 'Product added successfully' });
//   } catch (error) {
//     console.error('Error occurred while adding product:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
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

const upload = multer({ storage: storage }).single('image');

// Multer error handler middleware
router.use(function(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading
    console.error('Multer error:', err);
    res.status(400).json({ error: 'File upload error' });
  } else {
    // An unknown error occurred
    console.error('Unknown error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upload endpoint
// router.post('/upload', (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       // Multer middleware encountered an error
//       console.error('Multer error:', err);
//       return res.status(400).json({ error: 'File upload error' });
//     }
    
//     // Image uploaded successfully, continue with product creation
//     try {
//       const { title, price, description, quantity } = req.body;
//       const image = req.file.filename;
//       const product = new Product({ title, price, description, quantity, image });
//       await product.save();
//       res.status(200).json({ message: 'Product added successfully' });
//     } catch (error) {
//       console.error('Error occurred while adding product:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
// });

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






