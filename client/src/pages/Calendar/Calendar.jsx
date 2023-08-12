import { Link } from "react-router-dom";
import "./calendar.css";

const Calendar = () => {
  const days = [
    { id: 1, day: "Sunday" },
    { id: 2, day: "Monday" },
    { id: 3, day: "Tuesday" },
    { id: 4, day: "Wednesday" },
    { id: 5, day: "Thursday" },
    { id: 6, day: "Friday" },
    { id: 7, day: "Saturday" },
  ];
  return (
    <div className="calendar-main-container">
      <Link
        className="border w-1/6 rounded-lg mb-5 mt-5 bg-sky-600 p-2 items-center flex justify-center text-zinc-100"
        to="/create-event"
      >
        Create Event
      </Link>
      <div className="flex flex-row calendar-days-container">
        {days.map((day) => (
          <div
            className="border calendar-day-container flex flex-col items-center"
            key={day.id}
          >
            <h1 className="bold text-1sxl">{day.day}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
