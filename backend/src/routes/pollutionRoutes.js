const express = require('express');
const Pollution = require('../models/Pollution');

const router = express.Router();

const varyValue = (value, min, max, jitter = 5) => {
  const next = value + Math.floor(Math.random() * (jitter * 2 + 1)) - jitter;
  return Math.max(min, Math.min(max, next));
};

router.get('/', async (req, res, next) => {
  try {
    const area = req.query.area;
    const query = area && area !== 'All Cities' ? { area } : {};
    const pollutionDocs = await Pollution.find(query).sort({ area: 1 }).lean();

    const data = pollutionDocs.map((item) => {
      const aqi = varyValue(item.aqi, 0, 250, 7);
      return {
        ...item,
        aqi,
        pm25: varyValue(item.pm25, 0, 180, 6),
        pm10: varyValue(item.pm10, 0, 240, 8),
        quality:
          aqi <= 50 ? 'Good' : aqi <= 100 ? 'Moderate' : 'Poor',
        capturedAt: new Date(),
      };
    });

    res.json({
      updatedAt: new Date(),
      data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
