import React from "react";
import Event from "../../../../models/Event";
import EventCard from "../../EventCard/EventCard";
import "./EventBalloonContent.scss";

type Props = {
  className?: string;
  event: Event;
};

const EventBalloonContent = ({ className, event }: Props) => {
  return (
    <div style={{ height: "280px" }} className={className}>
      <EventCard event={event} />
    </div>
  );
};

export default EventBalloonContent;
