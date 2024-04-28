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

// // Configure multer limits
// const limits = {
//   fileSize: 5 * 1024 * 1024, // 5MB file size limit
// };

// // Configure multer file type filter
// const fileFilter = (req, file, cb) => {
//   // Allowed file types
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'));
//   }
// };

// const upload = multer({ 
//   storage: storage,
//   limits: limits,
//   fileFilter: fileFilter
// }).single('image');

// // Multer error handler middleware
// router.use(function(err, req, res, next) {
//   if (err instanceof multer.MulterError) {
//     // A Multer error occurred when uploading
//     console.error('Multer error:', err);
//     if (err.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({ error: 'File size too large. Maximum 5MB allowed.' });
//     } else {
//       return res.status(400).json({ error: 'File upload error' });
//     }
//   } else if (err) {
//     // An unknown error occurred
//     console.error('Unknown error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   } else {
//     next(); // No multer error, continue to next middleware
//   }
// });

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

//       // Attempt to save the product to the database
//       await product.save();

//       // If successful, send a success response
//       res.status(200).json({ message: 'Product added successfully' });
//     } catch (error) {
//       // If there's an error with the database operation, handle it here
//       console.error('Error occurred while adding product:', error);
//       // Check if the error is related to database connectivity
//       if (error.name === 'MongoError' && error.message.includes('Topology was destroyed')) {
//         // If database connectivity error, send a specific error message
//         res.status(500).json({ error: 'Database connectivity issue. Please try again later.' });
//       } else {
//         // Otherwise, send a generic internal server error
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     }
//   });
// });

// module.exports = router;

// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// const router = express.Router();

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Multer upload middleware
// const upload = multer({ storage: storage }).single('image');

// // Multer error handler middleware
// router.use(function(err, req, res, next) {
//   if (err instanceof multer.MulterError) {
//     console.error('Multer error:', err);
//     if (err.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({ error: 'File size too large. Maximum 5MB allowed.' });
//     } else {
//       return res.status(400).json({ error: 'File upload error' });
//     }
//   } else if (err) {
//     console.error('Unknown error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   } else {
//     next(); // No multer error, continue to next middleware
//   }
// });

// // Upload endpoint
// router.post('/upload', (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       console.error('Multer error:', err);
//       return res.status(400).json({ error: 'File upload error' });
//     }

//     try {
//       const { title, price, description, quantity } = req.body;
//       const image = req.file.filename;

//       // Here, you would save the product details to your database

//       res.status(200).json({ message: 'Product added successfully' });
//     } catch (error) {
//       console.error('Error occurred while adding product:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
// });

// // GET endpoint to fetch images
// router.get('/images', (req, res) => {
//   const directoryPath = path.join(__dirname, 'uploads');

//   fs.readdir(directoryPath, function(err, files) {
//     if (err) {
//       console.error('Error reading directory:', err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }

//     const images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif'));

//     // Assuming you want to send the list of image filenames to the client
//     res.status(200).json({ images });
//   });
// });

// module.exports = router;


// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const cloudinary = require('cloudinary').v2;
// const Product = require('./addproduct.js'); // Import your Mongoose Product model

// const router = express.Router();

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Initialize Cloudinary
// cloudinary.config({
//   cloud_name: 'djxbzcayc',
//   api_key: '177435834375344',
//   api_secret: 'VC8o4lQSa551ADbsUtPtV3jIaO4'
// });

// // Multer upload middleware
// const upload = multer({ storage: storage }).single('image');

// // Multer error handler middleware
// router.use(function(err, req, res, next) {
//   if (err instanceof multer.MulterError) {
//     console.error('Multer error:', err);
//     if (err.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({ error: 'File size too large. Maximum 5MB allowed.' });
//     } else {
//       return res.status(400).json({ error: 'File upload error' });
//     }
//   } else if (err) {
//     console.error('Unknown error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   } else {
//     next(); // No multer error, continue to next middleware
//   }
// });

// // Upload endpoint
// router.post('/upload', (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       console.error('Multer error:', err);
//       return res.status(400).json({ error: 'File upload error' });
//     }

//     try {
//       const { title, price, description, quantity } = req.body;
//       const image = req.file.path; // Path to the uploaded image file

//       // Upload image to Cloudinary
//       const cloudinaryResponse = await cloudinary.uploader.upload(image);

//       // Save product details to database
//       const product = new Product({
//         title,
//         price,
//         description,
//         quantity,
//         imageUrl: cloudinaryResponse.url // Store the image URL from Cloudinary
//       });
//       await product.save();

//       res.status(200).json({ message: 'Product added successfully' });
//     } catch (error) {
//       console.error('Error occurred while adding product:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
// });

// router.get('/products', async (req, res) => {
//   try {
//     const products = await Product.find(); // Retrieve all products
//     res.status(200).json({ products });
//   } catch (error) {
//     console.error('Error occurred while retrieving products:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// module.exports = router;


const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Product = require('./addproduct.js'); // Import your Mongoose Product model

const router = express.Router();

// Configure multer storage
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
const upload = multer({ storage: storage }).single('image');

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

// Upload endpoint
router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: 'File upload error' });
    }

    try {
      const { productName, price, description, quantity, category } = req.body;
      const image = req.file.path; // Path to the uploaded image file

      // Upload image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(image);

      // Save product details to database
      const product = new Product({
        productName,
        price,
        description,
        quantity,
        category,
        imageUrl: cloudinaryResponse.url // Store the image URL from Cloudinary
      });
      await product.save();

      res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
      console.error('Error occurred while adding product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Retrieve all products
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error occurred while retrieving products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// router.patch('/editproduct/:id', async (req, res) => {
//   try {
//     const { productName, price, description, quantity, category } = req.body;
//     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
//       productName,
//       price,
//       description,
//       quantity,
//       category
//     }, { new: true }); // Set new: true to return the updated document

//     if (!updatedProduct) {
//       return res.status(404).json({ status: 'failure', message: 'Product not found' });
//     }

//     res.status(200).json({ status: 'success', message: 'Product updated successfully', product: updatedProduct });
//   } catch (error) {
//     console.error('Error occurred while updating product:', error);
//     res.status(500).json({ status: 'failure', message: 'Could not update product', error: error });
//   }
// });

// PATCH route to edit product details
router.patch('/editproduct/:id', async (req, res) => {
  try {
    const { productName, price, description, quantity, category, imageUrl } = req.body;

    // Prepare the update object
    const updateFields = {
      productName,
      price,
      description,
      quantity,
      category
    };

    // If imageUrl is provided, update the image as well
    if (imageUrl) {
      updateFields.imageUrl = imageUrl;
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ status: 'failure', message: 'Product not found' });
    }

    res.status(200).json({ status: 'success', message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error occurred while updating product:', error);
    res.status(500).json({ status: 'failure', message: 'Could not update product', error: error });
  }
});

// GET route to fetch a particular product by ID
router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: 'failure', message: 'Product not found' });
    }
    res.status(200).json({ status: 'success', product });
  } catch (error) {
    console.error('Error occurred while fetching product:', error);
    res.status(500).json({ status: 'failure', message: 'Could not fetch product', error: error });
  }
});


// Delete product endpoint
router.delete('/deleteproduct/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ status: 'failure', message: 'Product not found' });
    }

    res.status(200).json({ status: 'success', message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error occurred while deleting product:', error);
    res.status(500).json({ status: 'failure', message: 'Could not delete product', error: error });
  }
});

// Search products endpoint
router.get('/search', async (req, res) => {
  try {
    const { keyword } = req.query;
    const products = await Product.find({
      $or: [
        { productName: { $regex: keyword, $options: 'i' } }, // Case-insensitive search for product name
        { description: { $regex: keyword, $options: 'i' } } // Case-insensitive search for description
      ]
    });

    res.status(200).json({ status: 'success', products: products });
  } catch (error) {
    console.error('Error occurred while searching products:', error);
    res.status(500).json({ status: 'failure', message: 'Could not search products', error: error });
  }
});

module.exports = router;

