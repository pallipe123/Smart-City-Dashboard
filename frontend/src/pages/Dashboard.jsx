import { useEffect, useMemo, useState } from 'react';
import EventsCard from '../components/EventsCard';
import CityMapCard from '../components/CityMapCard';
import LoadingOverlay from '../components/LoadingOverlay';
import Navbar from '../components/Navbar';
import PollutionCard from '../components/PollutionCard';
import TrafficCard from '../components/TrafficCard';
import WeatherCard from '../components/WeatherCard';
import {
  fetchEventsData,
  fetchPollutionData,
  fetchTrafficData,
} from '../api/dashboardApi';
import '../styles/dashboard.css';

const INDIAN_CITIES = [
  'All Cities',
  'Hyderabad',
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Chennai',
];

const CITY_WEATHER = {
  'All Cities': {
    temperature: 30,
    humidity: 58,
    windSpeed: 18,
    condition: 'National Snapshot',
  },
  Hyderabad: { temperature: 31, humidity: 48, windSpeed: 16, condition: 'Sunny Haze' },
  Mumbai: { temperature: 29, humidity: 76, windSpeed: 22, condition: 'Humid Breeze' },
  Delhi: { temperature: 33, humidity: 38, windSpeed: 14, condition: 'Dry & Warm' },
  Bengaluru: { temperature: 26, humidity: 58, windSpeed: 17, condition: 'Cloudy Comfort' },
  Chennai: { temperature: 30, humidity: 71, windSpeed: 21, condition: 'Coastal Clouds' },
};

function Dashboard() {
  const [now, setNow] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [trafficData, setTrafficData] = useState([]);
  const [pollutionData, setPollutionData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [citySwitching, setCitySwitching] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const refreshData = async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      setError('');

      const [trafficResponse, pollutionResponse, eventsResponse] =
        await Promise.all([
          fetchTrafficData('All Cities'),
          fetchPollutionData('All Cities'),
          fetchEventsData('All Cities'),
        ]);

      setTrafficData(trafficResponse.data);
      setPollutionData(pollutionResponse.data);
      setEventData(eventsResponse.data);
    } catch (apiError) {
      setError('Could not fetch dashboard data. Check API and environment settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData(true);

    const poller = setInterval(() => {
      refreshData(false);
    }, 5000);

    return () => clearInterval(poller);
  }, []);

  useEffect(() => {
    setCitySwitching(true);
    const timer = setTimeout(() => setCitySwitching(false), 350);
    return () => clearTimeout(timer);
  }, [selectedCity]);

  const areas = useMemo(() => INDIAN_CITIES, []);

  const cityData = useMemo(
    () => ({
      Hyderabad: {
        traffic: trafficData.filter((item) => item.area === 'Hyderabad'),
        pollution: pollutionData.filter((item) => item.area === 'Hyderabad'),
        events: eventData.filter((item) => item.area === 'Hyderabad'),
      },
      Mumbai: {
        traffic: trafficData.filter((item) => item.area === 'Mumbai'),
        pollution: pollutionData.filter((item) => item.area === 'Mumbai'),
        events: eventData.filter((item) => item.area === 'Mumbai'),
      },
      Delhi: {
        traffic: trafficData.filter((item) => item.area === 'Delhi'),
        pollution: pollutionData.filter((item) => item.area === 'Delhi'),
        events: eventData.filter((item) => item.area === 'Delhi'),
      },
      Bengaluru: {
        traffic: trafficData.filter((item) => item.area === 'Bengaluru'),
        pollution: pollutionData.filter((item) => item.area === 'Bengaluru'),
        events: eventData.filter((item) => item.area === 'Bengaluru'),
      },
      Chennai: {
        traffic: trafficData.filter((item) => item.area === 'Chennai'),
        pollution: pollutionData.filter((item) => item.area === 'Chennai'),
        events: eventData.filter((item) => item.area === 'Chennai'),
      },
    }),
    [trafficData, pollutionData, eventData]
  );

  const viewData = useMemo(() => {
    if (selectedCity === 'All Cities') {
      return {
        traffic: trafficData,
        pollution: pollutionData,
        events: eventData,
      };
    }

    return cityData[selectedCity] || { traffic: [], pollution: [], events: [] };
  }, [selectedCity, trafficData, pollutionData, eventData, cityData]);

  const weather = CITY_WEATHER[selectedCity] || CITY_WEATHER.Hyderabad;

  const highestAqi = viewData.pollution.reduce(
    (max, item) => (item.aqi > max ? item.aqi : max),
    0
  );

  return (
    <main className={isDarkMode ? 'app-shell dark' : 'app-shell'}>
      <Navbar
        now={now}
        selectedArea={selectedCity}
        areas={areas}
        onAreaChange={setSelectedCity}
        isDarkMode={isDarkMode}
        onToggleMode={() => setIsDarkMode((prev) => !prev)}
      />

      <div className="live-badge" aria-live="polite">
        <span className="live-dot" /> Live city telemetry
      </div>

      {highestAqi > 120 ? (
        <div className="alert-banner" role="alert">
          Air quality alert: AQI is high in at least one zone.
        </div>
      ) : null}

      {error ? <div className="error-banner">{error}</div> : null}

      <section className={citySwitching ? 'dashboard-grid switching' : 'dashboard-grid'}>
        <TrafficCard data={viewData.traffic} />
        <PollutionCard data={viewData.pollution} />
        <EventsCard data={viewData.events} />
        <WeatherCard city={selectedCity} weather={weather} />
        <CityMapCard
          city={selectedCity}
          trafficData={viewData.traffic}
          eventData={viewData.events}
        />
      </section>

      {loading || citySwitching ? <LoadingOverlay /> : null}
    </main>
  );
}

export default Dashboard;
