const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing
require('dotenv').config(); // Load environment variables from .env file
const userRoutes = require('./routes/userRoutes'); // Import routes

const app = express();
const port = process.env.PORT || 5000; // Default to port 5000 if PORT is not set in .env

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

app.use(session({
  secret: 'some secret', // Use a more secure secret
  name: 'sessionId', // Custom session ID name
  cookie: { maxAge: 86400000, secure: false }, // Set secure to true if using HTTPS
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use routes
app.use('/api', userRoutes); // Prefix all routes with /api

// Login route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log("Server running on http://localhost:${port}");
});