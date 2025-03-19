require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')


const cors = require('cors')


// express app
const app = express()

// middleware
app.use(express.json()) // Parse incoming requests with JSON payloads

// Enable CORS (if your frontend is on a different port)
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies and credentials
  })
);


// Simple request logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// routes
app.use('/api', userRoutes)

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database')
    // start the server after database connection is established
    app.listen(process.env.PORT, () => {
      console.log(`Listening for requests on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.error('Database connection failed', err)
    process.exit(1) // Exit the process with a failure code
  })
