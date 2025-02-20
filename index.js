const express = require('express');
const mongoose = require('mongoose');
const { resolve } = require('path');
const User = require('./schema'); // Import the User model

const app = express();
const port = 3010;

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/user_management')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.static('static'));
app.use(express.json()); // Middleware to parse JSON request body

// Serve Homepage
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// ✅ Route to Add a Sample User
app.get('/add-user', async (req, res) => {
  try {
    const newUser = new User({
      username: 'arun123',
      email: 'arun@example.com',
      password: 'securepassword',
      roles: ['admin'],
      profile: { firstName: 'arun', lastName: 'p', age: 18 }
    });

    await newUser.save();
    res.send('User added successfully!');
  } catch (error) {
    res.status(500).send('Error adding user: ' + error.message);
  }
});

// ✅ List All Users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Error fetching users: ' + error.message);
  }
});

// ✅ Find User by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(500).send('Error fetching user: ' + error.message);
  }
});

// ✅ Update User by ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).send('User not found');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send('Error updating user: ' + error.message);
  }
});

// ✅ Delete User by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send('User not found');
    res.send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting user: ' + error.message);
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});