// const mongoose = require('mongoose');

// // Define the schema for the Wishlist
// const CartSchema = new mongoose.Schema({
//   customerId: {
//     type: String,
//   },
//   products: [{
//     type: String, // Reference to the Product model
//   }],
//   adminId:{
//     type: String,
//   }
// });

// // Create the Wishlist model
// const Cart = mongoose.model('Cart', CartSchema);

// module.exports = Cart;

const mongoose = require('mongoose');

// Define the schema for the Cart
const CartSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  products: [{
    productId: String,
    productName: String,
    description: String,
    price: Number,
    category: String,
    quantity: Number,
    imageUrl: String
  }],
  adminId: {
    type: String,
    required: true,
  }
});

// Create the Cart model
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;

