const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true, // Ensures uniqueness of email addresses
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  }
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
