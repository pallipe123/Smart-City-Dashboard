import { FaWind } from 'react-icons/fa6';
import AnimatedNumber from './AnimatedNumber';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const getStatusColor = (aqi) => {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  return 'poor';
};

function PollutionCard({ data }) {
  const avgAqi =
    data.length > 0
      ? Math.round(data.reduce((acc, item) => acc + item.aqi, 0) / data.length)
      : 0;

  const chartData = data.map((item) => ({
    area: item.area,
    aqi: item.aqi,
    fill: item.aqi <= 50 ? '#18b97a' : item.aqi <= 100 ? '#e3b341' : '#e5534b',
  }));

  return (
    <section className="card pollution-card">
      <div className="card-header">
        <h2>
          <FaWind className="icon" /> Pollution Data 🌫️
        </h2>
        <p>
          Average AQI: <AnimatedNumber value={avgAqi} />
        </p>
      </div>

      {data.length > 1 ? (
        <div className="pollution-chart-wrapper">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-line)" />
              <XAxis dataKey="area" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip contentStyle={{ borderRadius: '12px' }} />
              <Bar dataKey="aqi" name="AQI" animationDuration={900}>
                {chartData.map((entry) => (
                  <Cell key={entry.area} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : null}

      <div className="pollution-list">
        {data.map((item) => {
          const status = getStatusColor(item.aqi);
          const width = Math.min(100, Math.round((item.aqi / 200) * 100));

          return (
            <article className="pollution-item" key={item._id}>
              <div className="pollution-label-row">
                <strong>{item.area}</strong>
                <span className={`status-pill ${status}`}>{item.quality}</span>
              </div>
              <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={200} aria-valuenow={item.aqi}>
                <div className={`progress-value ${status}`} style={{ width: `${width}%` }} />
              </div>
              <small>AQI {item.aqi} | PM2.5 {item.pm25} | PM10 {item.pm10}</small>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default PollutionCard;
