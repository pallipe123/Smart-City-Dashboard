const Event = require('../models/Event');
const Pollution = require('../models/Pollution');
const Traffic = require('../models/Traffic');

const CITY_LIST = ['Hyderabad', 'Mumbai', 'Delhi', 'Bengaluru', 'Chennai'];

const trafficSeed = [
  {
    area: 'Hyderabad',
    vehicleCount: 248,
    trafficDensity: 69,
    hotspot: { lat: 17.4435, lng: 78.3772 },
  },
  {
    area: 'Mumbai',
    vehicleCount: 302,
    trafficDensity: 82,
    hotspot: { lat: 19.076, lng: 72.8777 },
  },
  {
    area: 'Delhi',
    vehicleCount: 286,
    trafficDensity: 77,
    hotspot: { lat: 28.6139, lng: 77.209 },
  },
  {
    area: 'Bengaluru',
    vehicleCount: 272,
    trafficDensity: 74,
    hotspot: { lat: 12.9716, lng: 77.5946 },
  },
  {
    area: 'Chennai',
    vehicleCount: 214,
    trafficDensity: 63,
    hotspot: { lat: 13.0827, lng: 80.2707 },
  },
];

const pollutionSeed = [
  { area: 'Hyderabad', aqi: 92, pm25: 42, pm10: 66 },
  { area: 'Mumbai', aqi: 118, pm25: 56, pm10: 84 },
  { area: 'Delhi', aqi: 142, pm25: 74, pm10: 110 },
  { area: 'Bengaluru', aqi: 78, pm25: 34, pm10: 52 },
  { area: 'Chennai', aqi: 86, pm25: 39, pm10: 60 },
];

const eventSeed = [
  {
    name: 'Tech Innovation Expo',
    area: 'Hyderabad',
    locationName: 'HITEC City Convention Center',
    eventTime: new Date(Date.now() + 60 * 60 * 1000),
    coordinates: { lat: 17.4504, lng: 78.3829 },
  },
  {
    name: 'Coastal Food Carnival',
    area: 'Mumbai',
    locationName: 'Marine Drive Plaza',
    eventTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    coordinates: { lat: 18.9439, lng: 72.8235 },
  },
  {
    name: 'Green Mobility Summit',
    area: 'Delhi',
    locationName: 'Pragati Maidan Hall',
    eventTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    coordinates: { lat: 28.6129, lng: 77.2422 },
  },
  {
    name: 'Smart Transit Meetup',
    area: 'Bengaluru',
    locationName: 'MG Road Civic Hub',
    eventTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
    coordinates: { lat: 12.9751, lng: 77.6065 },
  },
  {
    name: 'Urban Resilience Workshop',
    area: 'Chennai',
    locationName: 'Anna Nagar Community Hall',
    eventTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    coordinates: { lat: 13.085, lng: 80.2093 },
  },
];

const seedInitialData = async () => {
  const [trafficCityCount, pollutionCityCount, eventCityCount] = await Promise.all([
    Traffic.countDocuments({ area: { $in: CITY_LIST } }),
    Pollution.countDocuments({ area: { $in: CITY_LIST } }),
    Event.countDocuments({ area: { $in: CITY_LIST } }),
  ]);

  const hasIndianDataset =
    trafficCityCount === CITY_LIST.length &&
    pollutionCityCount === CITY_LIST.length &&
    eventCityCount >= CITY_LIST.length;

  if (!hasIndianDataset) {
    await Promise.all([
      Traffic.deleteMany({}),
      Pollution.deleteMany({}),
      Event.deleteMany({}),
    ]);

    await Promise.all([
      Traffic.insertMany(trafficSeed),
      Pollution.insertMany(pollutionSeed),
      Event.insertMany(eventSeed),
    ]);

    console.log('Seed data synced for Indian cities');
  }
};

module.exports = seedInitialData;
