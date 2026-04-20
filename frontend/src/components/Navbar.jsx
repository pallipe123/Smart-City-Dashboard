import { FaCity } from 'react-icons/fa6';

const formatDateTime = (date) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(date);

function Navbar({ now, selectedArea, areas, onAreaChange, isDarkMode, onToggleMode }) {
  return (
    <header className="navbar card">
      <div className="navbar-title">
        <FaCity className="icon" />
        <div>
          <h1>Smart City Dashboard</h1>
          <p>Real-time city monitoring</p>
        </div>
      </div>

      <div className="navbar-controls">
        <label className="area-select-wrapper" htmlFor="area-select">
          <span>Select City</span>
          <select
            id="area-select"
            value={selectedArea}
            onChange={(event) => onAreaChange(event.target.value)}
          >
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </label>

        <span className="selected-city-pill">Selected: {selectedArea}</span>

        <button className="mode-button" onClick={onToggleMode} type="button">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        <time className="timestamp" dateTime={now.toISOString()}>
          {formatDateTime(now)}
        </time>
      </div>

      <div className="city-chip-row" aria-label="Quick city switcher">
        {areas.map((city) => (
          <button
            key={city}
            type="button"
            className={city === selectedArea ? 'city-chip active' : 'city-chip'}
            onClick={() => onAreaChange(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </header>
  );
}

export default Navbar;
