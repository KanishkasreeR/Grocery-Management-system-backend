const mongoose = require('mongoose');

// Define the schema for the Wishlist
const CartSchema = new mongoose.Schema({
  customerId: {
    type: String,
  },
  products: [{
    type: String, // Reference to the Product model
  }],
  adminId:{
    type: String,
  }
});

// Create the Wishlist model
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
