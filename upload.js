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
const wishlists = require('./Wishlist.js');
const Cart = require('./Cart.js');
const Order = require('./OrderSchema.js')

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
// router.post('/upload', (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       console.error('Multer error:', err);
//       return res.status(400).json({ error: 'File upload error' });
//     }

//     try {
//       const { productName, price, description, quantity, category } = req.body;
//       const image = req.file.path; // Path to the uploaded image file

//       // Upload image to Cloudinary
//       const cloudinaryResponse = await cloudinary.uploader.upload(image);

//       // Save product details to database
//       const product = new Product({
//         productName,
//         price,
//         description,
//         quantity,
//         category,
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

// router.post('/upload', (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       console.error('Multer error:', err);
//       return res.status(400).json({ error: 'File upload error' });
//     }

//     try {
//       const { productName, adminId, prices, description, category } = req.body;
//       const image = req.file.path; // Path to the uploaded image file

//       // Upload image to Cloudinary
//       const cloudinaryResponse = await cloudinary.uploader.upload(image);

//       // Convert prices from string to array of objects
//       const pricesArray = JSON.parse(prices);

//       // Save product details to database
//       const product = new Product({
//         productName,
//         adminId, // Use the adminId received from frontend
//         prices: pricesArray,
//         description,
//         category,
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

router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
      if (err) {
          console.error('Multer error:', err);
          return res.status(400).json({ error: 'File upload error' });
      }

      try {
          const { productName, adminId, price, quantity, description, category } = req.body;
          const image = req.file.path; // Path to the uploaded image file

          // Upload image to Cloudinary
          const cloudinaryResponse = await cloudinary.uploader.upload(image);

          // Save product details to database
          const product = new Product({
              productName,
              adminId, // Use the adminId received from frontend
              price,
              quantity,
              description,
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



// router.get('/products', async (req, res) => {
//   try {
//     const products = await Product.find(); // Retrieve all products
//     res.status(200).json({ products });
//   } catch (error) {
//     console.error('Error occurred while retrieving products:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

router.get('/products', async (req, res) => {
  try {
    const { adminId } = req.query; // Get adminId from query parameters

    // Check if adminId is provided
    if (!adminId) {
      return res.status(400).json({ error: 'Admin ID is required' });
    }

    const products = await Product.find({ adminId }); // Retrieve products for the specified adminId
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error occurred while retrieving products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// PATCH route to edit product details
router.patch('/editproduct/:id', async (req, res) => {
  try {
    const { productName, price, description, quantity, category } = req.body;

    // Prepare the update object
    const updateFields = {
      productName,
      price,
      description,
      quantity,
      category
    };

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



// Delete product endpoint
// router.delete('/deleteproduct/:id', async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);

//     if (!deletedProduct) {
//       return res.status(404).json({ status: 'failure', message: 'Product not found' });
//     }

//     res.status(200).json({ status: 'success', message: 'Product deleted successfully' });
//   } catch (error) {
//     console.error('Error occurred while deleting product:', error);
//     res.status(500).json({ status: 'failure', message: 'Could not delete product', error: error });
//   }
// });

router.delete('/deleteproduct/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ status: 'failure', message: 'Product not found' });
    }

    // Remove the product from all wishlists
    await wishlists.updateMany(
      { products: productId },
      { $pull: { products: productId } }
    );

    // Remove the product from all carts
    await Cart.updateMany(
      { products: productId },
      { $pull: { products: productId } }
    );

    res.status(200).json({ status: 'success', message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error occurred while deleting product:', error);
    res.status(500).json({ status: 'failure', message: 'Could not delete product', error: error });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { keyword, adminId } = req.query;
    let query = { adminId };

    if (keyword) {
      query.$or = [
        { productName: { $regex: keyword, $options: 'i' } }, // Search product name
        { category: { $regex: keyword, $options: 'i' } } // Search category
      ];
    }

    const products = await Product.find(query);

    res.status(200).json({ status: 'success', products });
  } catch (error) {
    console.error('Error occurred while searching products:', error);
    res.status(500).json({ status: 'failure', message: 'Could not search products', error });
  }
});


// router.post('/addToWishlist', async (req, res) => {
//   try {
//     const { productId, customerId } = req.body;

//     // Check if the wishlist exists for the customer
//     let wishlist = await wishlists.findOne({ customerId });

//     // If wishlist doesn't exist, create a new one
//     if (!wishlist) {
//       wishlist = new wishlists({ customerId, products: [] });
//     }

//     // Check if the product is already in the wishlist
//     if (wishlist.products.includes(productId)) {
//       return res.status(400).json({ error: 'Product already exists in wishlist' });
//     }

//     // Add the productId to the wishlist
//     wishlist.products.push(productId);
    
//     // Save the updated wishlist
//     await wishlist.save();

//     // Respond with success message
//     res.status(200).json({ message: 'Product added to wishlist successfully' });
//   } catch (error) {
//     console.error('Error adding product to wishlist:', error);
//     res.status(500).json({ error: 'Failed to add product to wishlist' });
//   }
// });

// router.post('/addToCart', async (req, res) => {
//   try {
//     const { productId, customerId } = req.body;

//     // Check if the wishlist exists for the customer
//     let cart = await Cart.findOne({ customerId });

//     // If Cart doesn't exist, create a new one
//     if (!cart) {
//       cart = new Cart({ customerId, products: [] });
//     }

//     // Check if the product is already in the Cart
//     if (cart.products.includes(productId)) {
//       return res.status(400).json({ error: 'Product already exists in Cart' });
//     }

//     // Add the productId to the Cart
//     cart.products.push(productId);
    
//     // Save the updated Cart
//     await cart.save();

//     // Respond with success message
//     res.status(200).json({ message: 'Product added to Cart successfully' });
//   } catch (error) {
//     console.error('Error adding product to Cart:', error);
//     res.status(500).json({ error: 'Failed to add product to Cart' });
//   }
// });

router.post('/addToWishlist', async (req, res) => {
  try {
    const { productId, customerId, adminId } = req.body;
    console.log(adminId);

    // Check if any of the required values are missing
    if (!productId || !customerId || !adminId) {
      return res.status(400).json({ error: 'Missing productId, customerId, or adminId' });
    }

    // Check if the wishlist exists for the customer
    let wishlist = await wishlists.findOne({ customerId });

    // If wishlist doesn't exist, create a new one
    if (!wishlist) {
      wishlist = new wishlists({ customerId, products: [], adminId }); // Set adminId here
      console.log(wishlist.adminId);
    }
    console.log(wishlist);
    console.log(wishlist.adminId);
    // Check if the product is already in the wishlist
    if (wishlist.products.includes(productId)) {
      return res.status(400).json({ error: 'Product already exists in wishlist' });
    }

    // Add the productId to the wishlist
    wishlist.products.push(productId);
    
    // Save the updated wishlist
    await wishlist.save();

    // Respond with success message
    res.status(200).json({ message: 'Product added to wishlist successfully' });
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    res.status(500).json({ error: 'Failed to add product to wishlist' });
  }
});


router.post('/addToCart', async (req, res) => {
  try {
    const { productId, customerId, adminId } = req.body;

    // Check if any of the required values are missing
    if (!productId || !customerId || !adminId) {
      return res.status(400).json({ error: 'Missing productId, customerId, or adminId' });
    }

    // Check if the cart exists for the customer
    let cart = await Cart.findOne({ customerId });

    // If Cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ customerId, adminId, products: [] });
    }

    // Check if the product is already in the Cart
    if (cart.products.includes(productId)) {
      return res.status(400).json({ error: 'Product already exists in Cart' });
    }

    // Add the productId to the Cart
    cart.products.push(productId);
    
    // Save the updated Cart
    await cart.save();

    // Respond with success message
    res.status(200).json({ message: 'Product added to Cart successfully' });
  } catch (error) {
    console.error('Error adding product to Cart:', error);
    res.status(500).json({ error: 'Failed to add product to Cart' });
  }
});

router.post('/addToCart2', async (req, res) => {
  try {
    const { productId, customerId, adminId } = req.body;

    // Check if any of the required values are missing
    if (!productId || !customerId || !adminId) {
      return res.status(400).json({ error: 'Missing productId, customerId, or adminId' });
    }

    // Check if the cart exists for the customer
    let cart = await Cart.findOne({ customerId });

    // If Cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ customerId, adminId, products: [] });
    }

    // Check if the product is already in the Cart
    if (cart.products.includes(productId)) {
      return res.status(400).json({ error: 'Product already exists in Cart' });
    }

    // Add the productId to the Cart
    cart.products.push(productId);
    
    // Save the updated Cart
    await cart.save();

    // Respond with success message
    res.status(200).json({ message: 'Product added to Cart successfully' });
  } catch (error) {
    console.error('Error adding product to Cart:', error);
    res.status(500).json({ error: 'Failed to add product to Cart' });
  }
});



router.get('/wishlist', async (req, res) => {
  try {
    const { customerId } = req.query;
    const wishlist = await wishlists.findOne({ customerId }).populate('products');
    res.json(wishlist.products);
  } catch (error) {
    console.error('Error fetching wishlist products:', error);
    res.status(500).json({ error: 'Failed to fetch wishlist products' });
  }
});

router.get('/cart', async (req, res) => {
  try {
    const { customerId } = req.query;
    const cart = await Cart.findOne({ customerId }).populate('products'); // Assuming the cart schema and model are named "Cart"
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart.products);
  } catch (error) {
    console.error('Error fetching cart products:', error);
    res.status(500).json({ error: 'Failed to fetch cart products' });
  }
});


router.get('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

router.delete('/removewishlist/:customerId/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const customerId = req.params.customerId;

    // Find the wishlist document for the customer
    const wishlist = await wishlists.findOneAndUpdate(
      { customerId: customerId },
      { $pull: { products: productId } },
      { new: true }
    );

    // Check if the wishlist exists
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    res.json(wishlist);
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    res.status(500).json({ error: 'Failed to remove product from wishlist' });
  }
});

router.delete('/removecart/:customerId/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const customerId = req.params.customerId;

    // Find the wishlist document for the customer
    const wishlist = await Cart.findOneAndUpdate(
      { customerId: customerId },
      { $pull: { products: productId } },
      { new: true }
    );

    // Check if the wishlist exists
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    res.json(wishlist);
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    res.status(500).json({ error: 'Failed to remove product from wishlist' });
  }
});

// router.post('/orders', async (req, res) => {
//   const { customerId, products, adminId, totalPrice, adminNo } = req.body;

//   const newOrder = new Order({
//     customerId,
//     products,
//     adminId,
//     totalPrice,
//   });

//   try {
//     // Save the new order
//     const savedOrder = await newOrder.save();

//     // Remove products from cart
    // await Cart.updateOne(
    //   { customerId },
    //   { $pull: { products: { $in: products.map(p => p.productId) } } }
    // );

//     res.status(201).json(savedOrder);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create order', error });
//   }
// });

const nodemailer = require('nodemailer');

// router.post('/orders', async (req, res) => {
//   const { customerId, adminId, products, totalPrice } = req.body;

//   try {
//     // Validate the input data if necessary

//     // Create a new order
//     const newOrder = new Order({
//       customerId,
//       products: products.map(product => ({
//         productId: product.productId,
//         productName: product.productName,
//         description: product.description,
//         price: product.price,
//         category: product.category,
//         qunatity:product.quantity,
//         imageUrl: product.imageUrl
//       })),
//       adminId,
//       totalPrice,
//       orderDate: Date.now()
//     });

//     // Save the new order
//     const savedOrder = await newOrder.save();

//     // Remove products from cart
//     // const productIds = products.map(product => product.productId);
//     // await Cart.updateOne(
//     //   { userId: customerId },
//     //   { $pull: { products: { productId: { $in: productIds } } } }
//     // );
//     const productIds = products.map(product => product.productId);
//     await Cart.updateOne(
//       { customerId: customerId }, // Corrected from 'userId' to 'customerId'
//       { $pull: { products: { productId: { $in: productIds } } } }
//     );

//     // Send email to the admin
//     await sendEmailToAdmin(customerId, adminId);

//     res.status(201).json(savedOrder);
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ message: 'Failed to create order', error });
//   }
// });

router.post('/orders', async (req, res) => {
  const { customerId, adminId, products, totalPrice } = req.body;

  try {
    // Validate the input data if necessary

    // Create a new order
    const newOrder = new Order({
      customerId,
      products: products.map(product => ({
        productId: product.productId,
        productName: product.productName,
        description: product.description,
        price: product.price,
        category: product.category,
        quantity: product.quantity, // Corrected typo from qunatity to quantity
        imageUrl: product.imageUrl
      })),
      adminId,
      totalPrice,
      orderDate: Date.now()
    });

    // Save the new order
    const savedOrder = await newOrder.save();

    // Remove products from cart
    const productIds = products.map(product => product.productId);
    await Cart.updateOne(
      { customerId: customerId },
      { $pull: { products: { $in: productIds }  } }
    );

    // Send email to the admin
    await sendEmailToAdmin(customerId, adminId);

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order', error });
  }
});
const Admin = require("./Adminmodel");

require('dotenv').config({ path: "./config.env" });

async function sendEmailToAdmin(userId, sellerId) {
  try {
    // Fetch seller details from the database
    const seller = await Admin.findById(sellerId);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: seller.email,
      subject: 'New Order Notification',
      text: `Dear ${seller.name},\n\nYou have a new order on your website. Please login to your account to view the details.\n\nBest regards,\nThe Team`
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
const User = require("./Usermodel"); 
router.post('/update-order-status', async (req, res) => {
  const { userId, sellerId, orderId, action } = req.body;

  try {
    // Update order status in the database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (action === 'accept') {
      order.status = 'Accepted';
    } else if (action === 'decline') {
      order.status = 'Declined';
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await order.save();

    // Send email to customer
    await sendEmail(userId, sellerId, orderId, action);

    res.status(200).json({ message: `Order ${action}ed successfully` });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

async function sendEmail(userId, sellerId, orderId, action) {
  try {
    // Fetch seller details from the database
    const seller = await Admin.findById(sellerId);
    // Fetch customer details from the database
    const customer = await User.findById(userId);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Determine email content based on action
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: action === 'accept' ? 'Order Confirmation' : 'Order Declined',
      text: action === 'accept' 
        ? `Dear ${customer.name},\n\nYour order ${orderId} has been confirmed. Please log in to your account to view the details.\n\nBest regards,\n${seller.name}`
        : `Dear ${customer.name},\n\nWe regret to inform you that your order ${orderId} has been declined.\nBest regards,\n${seller.name}`
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

router.get('/getorders', async (req, res) => {
  const { adminId } = req.query;

  try {
    console.log(`Fetching orders for adminId: ${adminId}`);
    const orders = await Order.find({ adminId });
    console.log(`Fetched orders: ${JSON.stringify(orders)}`);
    
    if (orders.length === 0) {
      console.log(`No orders found for adminId: ${adminId}`);
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});

router.get('/getcustomerorders', async (req, res) => {
  const { customerId } = req.query;

  try {
    console.log(`Fetching orders for customerId: ${customerId}`);
    const orders = await Order.find({ customerId });
    console.log(`Fetched orders: ${JSON.stringify(orders)}`);
    
    if (orders.length === 0) {
      console.log(`No orders found for customerId: ${customerId}`);
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});

router.put('/editproduct2/:id', async (req, res) => {
  const { productName, adminId, price, quantity, description, category, imageUrl } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { productName, adminId, price, quantity, description, category, imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ status: 'failure', message: 'Product not found' });
    }

    res.status(200).json({ status: 'success', message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error occurred while updating product:', error);
    res.status(500).json({ status: 'failure', message: 'Could not update product', error: error });
  }
});





module.exports = router;


