const mongoose = require('mongoose');

const trafficSchema = new mongoose.Schema(
  {
    area: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleCount: {
      type: Number,
      required: true,
      min: 0,
    },
    trafficDensity: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    hotspot: {
      lat: Number,
      lng: Number,
    },
    capturedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Traffic', trafficSchema);
