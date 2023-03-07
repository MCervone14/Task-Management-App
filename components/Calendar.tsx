"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useEffect, useState } from "react";

const localizer = momentLocalizer(moment);

const handleSelectEvent = (event) => {
  console.log(event);
};

const handleSelectSlot = (slotInfo) => {
  console.log(slotInfo);
};

const handleNavigate = (date, view) => {
  console.log(date, view);
};

const CalendarComponent = ({ data }) => {
  const [events, setEvents] = useState([
    {
      start: null,
      end: null,
      title: "",
    },
  ]);

  useEffect(() => {
    const projects = data.map((project) => {
      return {
        start: project.createdAt,
        end: project.createdAt,
        title: project.name,
      };
    });
    setEvents(projects);
  }, [data]);

  return (
    <div className="h-[837px] bg-white">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default CalendarComponent;
