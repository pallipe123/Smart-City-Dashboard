import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const dashboardApi = axios.create({
  baseURL: API_BASE_URL,
});

const mapQuery = (area) =>
  area && area !== 'All Cities' ? { params: { area } } : undefined;

export const fetchTrafficData = async (area) => {
  const response = await dashboardApi.get('/traffic', mapQuery(area));
  return response.data;
};

export const fetchPollutionData = async (area) => {
  const response = await dashboardApi.get('/pollution', mapQuery(area));
  return response.data;
};

export const fetchEventsData = async (area) => {
  const response = await dashboardApi.get('/events', mapQuery(area));
  return response.data;
};
