import React from "react";
import "./EventBalloonContent.scss";
import EventCard from "../../EventCard/EventCard";
import Event from "../../../../models/Event";
import globalStore from "../../../../stores/GlobalStore";

type Props = {
  className?: string;
  event: Event | null;
};

const EventBalloonContent = ({ className, event }: Props) => {
  const onMouseEnter = () => {
    const modal = document.getElementsByClassName(
      "popup-modal-window"
    )[0] as HTMLElement;
    modal.style.visibility = "visible";
  };

  const onMouseLeave = async () => {
    const modal = document.getElementsByClassName(
      "popup-modal-window"
    )[0] as HTMLElement;
    modal.style.visibility = "hidden";
    globalStore.eventStore.resetBalloonEvent();
  };

  return (
    <div
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className={className}
    >
      {event && <EventCard event={event} />}
    </div>
  );
};

export default EventBalloonContent;
