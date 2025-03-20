require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user'); // Import user routes
const cors = require('cors');

// Express app
const app = express();

// Middleware
app.use(express.json());

// Enable CORS (if your frontend is on a different port)
app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  }) 
);

// Simple request logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    // Start the server after database connection is established
    app.listen(process.env.PORT, () => {
      console.log(`Listening for requests on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed', err);
    process.exit(1); 
  });