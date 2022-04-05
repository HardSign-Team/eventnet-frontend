import React from "react";
import EventCard from "../EventCard/EventCard";
import "./EventList.css";
import { observer } from "mobx-react-lite";
import eventStore from "../../stores/EventStore";

const EventList = observer(() => {
  return (
    <div className="event-container">
      {eventStore.events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
});

export default EventList;
