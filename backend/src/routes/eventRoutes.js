const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const area = req.query.area;
    const query = area && area !== 'All Cities' ? { area } : {};
    const events = await Event.find(query).sort({ eventTime: 1 }).lean();

    res.json({
      updatedAt: new Date(),
      data: events,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
