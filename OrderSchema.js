const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: String,
  products: Array,
  adminId: String,
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
