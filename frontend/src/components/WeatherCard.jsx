import { FaCloudSun } from 'react-icons/fa6';
import AnimatedNumber from './AnimatedNumber';

function WeatherCard({ city, weather }) {
  return (
    <section className="card weather-card">
      <div className="card-header">
        <h2>
          <FaCloudSun className="icon" /> Weather 🌤️
        </h2>
        <p>{city}</p>
      </div>
      <div className="weather-grid">
        <p>
          <strong>
            <AnimatedNumber value={weather.temperature} suffix="°C" />
          </strong>
        </p>
        <p>{weather.condition}</p>
        <small>Humidity: {weather.humidity}%</small>
        <small>Wind: {weather.windSpeed} km/h</small>
      </div>
    </section>
  );
}

export default WeatherCard;
