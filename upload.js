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

const express = require('express');
const multer = require('multer');
const router = express.Router();

// Set up multer storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    // Generate a unique filename by appending the current timestamp and original file extension
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Initialize multer with the configured storage engine
const upload = multer({ storage: storage });

// POST endpoint to handle file uploads
router.post('/upload', upload.single('image'), (req, res) => {
  // If the file is successfully uploaded, send a success response
  res.status(200).json({ message: 'File uploaded successfully' });
});

module.exports = router;


