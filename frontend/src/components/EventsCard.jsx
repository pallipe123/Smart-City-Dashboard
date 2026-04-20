import { FaChampagneGlasses } from 'react-icons/fa6';

const formatEventTime = (value) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

function EventsCard({ data }) {
  return (
    <section className="card events-card">
      <div className="card-header">
        <h2>
          <FaChampagneGlasses className="icon" /> Events 🎉
        </h2>
      </div>

      <ul className="events-list">
        {data.map((event) => (
          <li key={event._id} className="event-item">
            <h3>{event.name}</h3>
            <p>{event.locationName}</p>
            <small>
              {event.area} | {formatEventTime(event.eventTime)}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EventsCard;
