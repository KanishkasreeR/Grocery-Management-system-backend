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



