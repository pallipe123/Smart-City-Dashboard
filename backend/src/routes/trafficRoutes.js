const express = require('express');
const Traffic = require('../models/Traffic');

const router = express.Router();

const varyValue = (value, min, max, jitter = 8) => {
  const next = value + Math.floor(Math.random() * (jitter * 2 + 1)) - jitter;
  return Math.max(min, Math.min(max, next));
};

router.get('/', async (req, res, next) => {
  try {
    const area = req.query.area;
    const query = area && area !== 'All Cities' ? { area } : {};
    const trafficDocs = await Traffic.find(query).sort({ area: 1 }).lean();

    const payload = trafficDocs.map((item) => ({
      ...item,
      vehicleCount: varyValue(item.vehicleCount, 50, 400, 20),
      trafficDensity: varyValue(item.trafficDensity, 10, 100, 10),
      capturedAt: new Date(),
    }));

    res.json({
      updatedAt: new Date(),
      data: payload,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
