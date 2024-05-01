// const mongoose = require("mongoose");

// const AdminSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Name is required."],
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required."],
//     unique: true, // Ensures uniqueness of email addresses
//   },
//   password: {
//     type: String,
//     required: [true, "Password is required."],
//   }
// });

// const Admin = mongoose.model("Admin", AdminSchema);

// module.exports = Admin;

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
  },
  storeName: {
    type: String,
    required: [true, "Store name is required."],
  },
  storeAddress: {
    type: String,
    required: [true, "Store address is required."],
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required."],
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
