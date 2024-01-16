require('dotenv').config();
const express = require('express');
const app = express();
const connectDatabase = require('./config/database');

connectDatabase();

app.use(express.json());

const roleSeeder = require('./utils/roleSeeder');

// Import routes
const authRoutes = require('./routes/authRoutes'); // Uncomment when authRoutes.js is created
const someProtectedRoutes = require('./routes/someProtectedRoute');

roleSeeder();

// Use routes
app.use('/api/auth', authRoutes); // Uncomment when authRoutes.js is created
app.use('/api/protected', someProtectedRoutes);

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

module.exports = app;
