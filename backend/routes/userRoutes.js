// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    const userId = req.session.userId;
    console.log(req.session.userId )
    const userOne = await User.findById(userId);
    res.json(userOne);
  } catch (err) {
    res.status(500).send('Error retrieving users: ' + err);
  }
});

// Create a new user
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  
  try {
    const savedUser = await user.save();
    req.session.userId = savedUser._id; // Store the user ID in the session
    console.log(req.session.userId )
    res.status(201).json(savedUser); // Return the created user object
  } catch (err) {   
    res.status(400).send('Error creating user: ' + err);
  }
});


// Get a specific user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(req.session.user);
  } catch (err) {
    res.status(500).send('Error retrieving user: ' + err);
  }
});

// Update a user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    res.status(500).send('Error updating user: ' + err);
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).send('Error deleting user: ' + err);
  }
});
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    if (req.session.authenticated) {
      return res.json(req.session);
    } else {
      // Replace this with actual user lookup and password hash verification
      // const user = await User.findOne({ username });
      // if (user && await bcrypt.compare(password, user.passwordHash)) {
      if (password === '123') { // Placeholder for demonstration
        req.session.authenticated = true;
        req.session.user = { username }; // Do not store password in session
        return res.json(req.session);
      } else {
        return res.status(403).json({ msg: 'Bad credentials' });
      }
    }
  } else {
    return res.status(403).json({ msg: 'Bad credentials' });
  }
});
router.get('/profile', (req, res) => {
  
    res.json({ message: 'Profile page', user: req.session.user });
  
});


module.exports = router;