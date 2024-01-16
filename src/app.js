require('dotenv').config();
const express = require('express');
const app = express();
const connectDatabase = require('./config/database');

connectDatabase();

app.use(express.json());

const roleSeeder = require('./utils/roleSeeder');

// Import routes
const authRoutes = require('./routes/authRoutes');
const someProtectedRoutes = require('./routes/someProtectedRoute');
const appointmentRoutes = require('./routes/appointmentRoutes');
const providerAvailabilityRoutes = require('./routes/providerAvailabilityRoutes');

roleSeeder();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', someProtectedRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/availabilities', providerAvailabilityRoutes);

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

module.exports = app;
