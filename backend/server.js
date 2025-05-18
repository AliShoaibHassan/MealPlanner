const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mealRoutes = require('./routes/mealRoutes');
const dotenv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 5100;
require('dotenv').config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

console.log('Mongo URI:', process.env.MONGO_URI);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/meals', mealRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
