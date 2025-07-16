
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  temperature: Number,
  description: String,       
  date: {
    type: Date,
    default: Date.now
  },
  humidity: Number,          
  windSpeed: Number          
});

module.exports = mongoose.model('Weather', weatherSchema);
