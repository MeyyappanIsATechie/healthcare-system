require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const redisClient = require('./config/redis');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test Redis
redisClient.set('test', 'connected');

// Base route
app.get('/', (req, res) => {
  res.send('Healthcare Backend is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const userRoutes = require('./routes/userRoutes');

app.use('/api/v1/users', userRoutes);
