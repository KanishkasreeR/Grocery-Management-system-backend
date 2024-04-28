// const mongoos = require('mongoose')

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

// export default Product;


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
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  quantity: Number,
  imageUrl: String // Add imageUrl field for storing Cloudinary URL
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

