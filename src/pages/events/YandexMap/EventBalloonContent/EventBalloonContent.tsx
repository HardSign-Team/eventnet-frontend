import React from "react";
import "./EventBalloonContent.scss";
import EventCard from "../../EventCard/EventCard";
import Event from "../../../../models/Event";

type Props = {
  className?: string;
  event: Event | null;
};

const EventBalloonContent = ({ className, event }: Props) => {
  return (
    <div className={className}>{event && <EventCard event={event} />}</div>
  );
};

export default EventBalloonContent;
