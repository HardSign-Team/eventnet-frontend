import React from "react";
import "./EventCard.css";
import Event from "../../models/Event";

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <section className="event-card">
      <h2>{event.info.name}</h2>
      <div className="description">{event.info.description}</div>
      <div className="event-card-data">
        Дата начала: {event.info.dateStart.toLocaleDateString()}
      </div>
      {event.info.dateEnd && (
        <div className="event-card-data">
          Дата конца: {event.info.dateEnd.toLocaleDateString()}
        </div>
      )}
    </section>
  );
}
