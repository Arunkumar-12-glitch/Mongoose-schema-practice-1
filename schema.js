const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ['user'] }, // Default role as 'user'
  profile: {
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number, min: 0 }
  },
  lastLogin: { type: Date, default: Date.now }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;