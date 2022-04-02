import React from "react";
import EventCard from "./EventCard";
import "./EventList.css";
import Event from "../models/Event";

function getEvents(): Array<Event> {
  const event1: Event = {
    id: 1,
    info: {
      name: "День пикачу",
      coordinates: [56.817076, 60.611855],
      dateStart: new Date(2021, 10, 15),
      likes: 2,
      description: "Абемнта купили называется",
      dateEnd: new Date(2021, 10, 15),
    },
  };

  const event2: Event = {
    id: 2,
    info: {
      coordinates: [55.817076, 61.611855],
      name: "01.06.2022",
      dateStart: new Date(2022, 6, 1),
      likes: 0,
      description: "Челлендж окончен",
      dateEnd: new Date(2022, 6, 2),
    },
  };
  return [event1, event2];
}

export default function EventList() {
  const events = getEvents();
  return (
    <div className="event-container">
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
}
