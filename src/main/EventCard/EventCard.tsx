import React from "react";
import "./EventCard.css";
import Event from "../../models/Event";

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="event-card">
      <h2>{event.info.name}</h2>
      <div className="description">{event.info.description}</div>
      <div className="event-card-data">
        Дата начала: {event.info.dateStart?.toLocaleDateString()}
      </div>
      <div className="event-card-data">
        Дата конца: {event.info.dateEnd?.toLocaleDateString()}
      </div>
    </div>
  );
}
