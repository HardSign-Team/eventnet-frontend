import React from "react";
import EventCard from "../EventCard/EventCard";
import "./EventList.css";
import globalStore from "../../../stores/GlobalStore";

const { eventStore } = globalStore;

const EventList = () => {
  return (
    <div className="event-container">
      {eventStore.events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
