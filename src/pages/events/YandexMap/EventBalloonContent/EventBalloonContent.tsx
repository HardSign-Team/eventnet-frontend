import React from "react";
import "./EventBalloonContent.scss";
import EventCard from "../../EventCard/EventCard";
import Event from "../../../../models/Event";

type Props = {
  className?: string;
  event: Event | null;
};

const EventBalloonContent = ({ className, event }: Props) => {
  const onMouseEnter = () => {
    const modal = document.getElementsByClassName(
      "popup-modal-window"
    )[0] as HTMLElement;
    modal.style.display = "block";
  };

  const onMouseLeave = () => {
    const modal = document.getElementsByClassName(
      "popup-modal-window"
    )[0] as HTMLElement;
    modal.style.display = "none";
  };

  return (
    <div
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {event && <EventCard event={event} />}
    </div>
  );
};

export default EventBalloonContent;
