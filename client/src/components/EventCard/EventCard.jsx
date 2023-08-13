const EventCard = ({ event }) => {
  return (
    <div className="border m-3 p-2">
      <h2>{event.name}</h2>
      <p>{event.location}</p>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.startingTime}</p>
      <p>{event.endingTime}</p>
      <p>5 people going</p>
    </div>
  );
};

export default EventCard;
