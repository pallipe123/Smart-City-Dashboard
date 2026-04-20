import { useEffect, useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { FaMapLocationDot } from 'react-icons/fa6';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import marker1x from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker1x,
  shadowUrl: markerShadow,
});

const CITY_CENTERS = {
  'All Cities': [22.9734, 78.6569, 5],
  Hyderabad: [17.385, 78.4867, 11],
  Mumbai: [19.076, 72.8777, 11],
  Delhi: [28.6139, 77.209, 11],
  Bengaluru: [12.9716, 77.5946, 11],
  Chennai: [13.0827, 80.2707, 11],
};

function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    const zoom = center[2] ?? 11;
    map.flyTo([center[0], center[1]], zoom, { duration: 1.2 });
  }, [map, center]);

  return null;
}

function CityMapCard({ city, trafficData, eventData }) {
  const center = useMemo(() => {
    const cityCenter = CITY_CENTERS[city];
    if (cityCenter) {
      return cityCenter;
    }

    const firstHotspot = trafficData.find((item) => item.hotspot)?.hotspot;
    if (firstHotspot?.lat && firstHotspot?.lng) {
      return [firstHotspot.lat, firstHotspot.lng, 11];
    }
    return CITY_CENTERS['All Cities'];
  }, [city, trafficData]);

  return (
    <section className="card map-card">
      <div className="card-header">
        <h2>
          <FaMapLocationDot className="icon" /> Live City Map
        </h2>
      </div>

      <MapContainer center={[center[0], center[1]]} zoom={center[2] ?? 11} scrollWheelZoom className="city-map">
        <RecenterMap center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {trafficData
          .filter((item) => item.hotspot?.lat && item.hotspot?.lng)
          .map((item) => (
          <Marker key={`traffic-${item._id}`} position={[item.hotspot.lat, item.hotspot.lng]}>
            <Popup>
              <strong>{item.area} hotspot</strong>
              <br />
              Vehicle Count: {item.vehicleCount}
              <br />
              Density: {item.trafficDensity}
            </Popup>
          </Marker>
          ))}

        {eventData
          .filter((event) => event.coordinates?.lat && event.coordinates?.lng)
          .map((event) => (
          <Marker key={`event-${event._id}`} position={[event.coordinates.lat, event.coordinates.lng]}>
            <Popup>
              <strong>{event.name}</strong>
              <br />
              {event.locationName}
              <br />
              {new Date(event.eventTime).toLocaleString()}
            </Popup>
          </Marker>
          ))}
      </MapContainer>
    </section>
  );
}

export default CityMapCard;
