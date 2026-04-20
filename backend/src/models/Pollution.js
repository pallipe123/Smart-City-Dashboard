const mongoose = require('mongoose');

const pollutionSchema = new mongoose.Schema(
  {
    area: {
      type: String,
      required: true,
      trim: true,
    },
    aqi: {
      type: Number,
      required: true,
      min: 0,
    },
    pm25: {
      type: Number,
      default: 0,
    },
    pm10: {
      type: Number,
      default: 0,
    },
    capturedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pollution', pollutionSchema);
