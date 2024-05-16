const mongoose = require('mongoose');

// Define the schema for the Wishlist
const wishlistSchema = new mongoose.Schema({
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
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
