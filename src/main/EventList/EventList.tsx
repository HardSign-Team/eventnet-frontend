import React from "react";
import EventCard from "../EventCard/EventCard";
import "./EventList.css";
import { useEventStore } from "../../contexts/EventContext";
import { observer } from "mobx-react-lite";

const EventList = observer(() => {
  const eventStore = useEventStore();
  return (
    <div className="event-container">
      {eventStore.events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
});

export default EventList;
