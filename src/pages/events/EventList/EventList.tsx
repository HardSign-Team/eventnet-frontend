import React from "react";
import EventCard from "../EventCard/EventCard";
import "./EventList.css";
import globalStore from "../../../stores/GlobalStore";
import { observer } from "mobx-react-lite";

const { eventStore } = globalStore;

const EventList = observer(() => {
  return (
    <div className="event-container">
      {eventStore.getEvents().map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
});

export default EventList;
