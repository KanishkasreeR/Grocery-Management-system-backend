
// const mongoose = require('mongoose');

// const ProductSchema = mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//         // unique: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     quantity: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: false
//     },
//     createdDate: {
//         type: Date,
//         default: Date.now
//     }
// });

// const Product = mongoose.model('Product', ProductSchema);

// module.exports = Product;

// addproduct.js
// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   title: String,
//   price: Number,
//   description: String,
//   quantity: Number,
//   category : String,
//   imageUrl: String // Add imageUrl field for storing Cloudinary URL
// });

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;

// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     productName: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     quantity: {
//         type: String, // Changed to string to accommodate both string and numeric values
//         required: true
//     },
//     category: {
//         type: String
//     },
//     imageUrl: {
//         type: String
//     }
// });

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;


// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     productName: {
//         type: String,
//         required: true
//     },
//     adminId: {
//         type:String,
//         required: true
//     },
//     prices: [{
//         price: {
//             type: Number,
//             required: true
//         },
//         quantity: {
//             type: String, // Quantity stored as a string
//             required: true
//         }
//     }],
//     description: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: String
//     },
//     imageUrl: {
//         type: String
//     }
// });

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    adminId: {
        type: String,
        required: true
    },
    price: {
        type: Number, // Single price field
        required: true
    },
    quantity: {
        type: String, // Quantity stored as a string
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    imageUrl: {
        type: String
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;



