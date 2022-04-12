import React from "react";
import EventCard from "../EventCard/EventCard";
import "./EventList.css";
import { observer } from "mobx-react-lite";
import globalStore from "../../stores/GlobalStore";

const { eventStore } = globalStore;

const EventList = observer(({ isOpenEvent }: { isOpenEvent: boolean }) => {
  return (
    <div
      className="event-container"
      style={{ height: isOpenEvent ? "50vh" : "75vh" }}
    >
      {eventStore.events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
});

export default EventList;
