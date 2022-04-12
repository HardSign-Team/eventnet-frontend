import React from "react";
import EventCard from "../EventCard/EventCard";
import "./EventList.css";
import { observer } from "mobx-react-lite";
import globalStore from "../../stores/GlobalStore";

const { eventStore } = globalStore;

const EventList = observer(() => {
  return (
    <div className="event-container">
      {eventStore.events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
});

export default EventList;
