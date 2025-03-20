require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/eventRoutes');
const helpRequestRoutes = require('./routes/helpRequestRoutes');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Routes
app.use('/api', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/requests', helpRequestRoutes);


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Listening for requests on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed', err);
    process.exit(1);
  });