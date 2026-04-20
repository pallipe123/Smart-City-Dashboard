import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FaCarSide } from 'react-icons/fa6';
import AnimatedNumber from './AnimatedNumber';

function TrafficCard({ data }) {
  const totalVehicles = data.reduce((total, item) => total + item.vehicleCount, 0);
  const avgDensity =
    data.length > 0
      ? Math.round(data.reduce((total, item) => total + item.trafficDensity, 0) / data.length)
      : 0;

  return (
    <section className="card chart-card">
      <div className="card-header">
        <h2>
          <FaCarSide className="icon" /> Traffic Data 🚗
        </h2>
        <p>
          Vehicles: <AnimatedNumber value={totalVehicles} /> | Density: <AnimatedNumber value={avgDensity} suffix="%" />
        </p>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} barCategoryGap={24}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-line)" />
            <XAxis dataKey="area" stroke="var(--text-secondary)" />
            <YAxis yAxisId="left" stroke="var(--text-secondary)" />
            <YAxis yAxisId="right" orientation="right" stroke="var(--text-secondary)" />
            <Tooltip contentStyle={{ borderRadius: '12px' }} />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="vehicleCount"
              name="Vehicle Count"
              fill="var(--accent-blue)"
              radius={[8, 8, 0, 0]}
              animationDuration={900}
            />
            <Bar
              yAxisId="right"
              dataKey="trafficDensity"
              name="Traffic Density"
              fill="var(--accent-green)"
              radius={[8, 8, 0, 0]}
              animationDuration={900}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="trafficDensity"
              name="Density Trend"
              stroke="#0b4f8c"
              strokeWidth={2}
              dot={{ r: 3 }}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default TrafficCard;
