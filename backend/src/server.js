const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const pollutionRoutes = require('./routes/pollutionRoutes');
const trafficRoutes = require('./routes/trafficRoutes');
const seedInitialData = require('./services/seedData');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const vercelPreviewPattern = /^https:\/\/smart-city-dashboard.*\.vercel\.app$/;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin) || vercelPreviewPattern.test(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Smart City Dashboard API is running' });
});

app.use('/api/traffic', trafficRoutes);
app.use('/api/pollution', pollutionRoutes);
app.use('/api/events', eventRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const startServer = async () => {
  try {
    await connectDB();
    await seedInitialData();

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error.message);
    process.exit(1);
  }
};

startServer();
