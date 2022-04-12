import React from "react";
import "./EventCard.scss";
import Event from "../../models/Event";
import { getDurationBetweenDates } from "../../utils/date";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

type EventCardProps = {
  event: Event;
};

const iconsStyle = {
  float: "right",
  borderRadius: "50%",
  backgroundColor: "#D7DCD7",
  display: "inline-block",
  marginRight: ".2rem",
  fontSize: "14px",
} as const;

const DEFAULT_EVENT_PHOTO_URL =
  "https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg";

export default function EventCard({ event }: EventCardProps) {
  return (
    <section className="event-card">
      <img
        src={
          (event.info.photos && event.info.photos[0]) || DEFAULT_EVENT_PHOTO_URL
        }
        alt="EventPhoto"
        width={"100%"}
        height={"125px"}
        className={"event-card__photo"}
      />
      <h4 className="event-card__title">{event.info.name}</h4>
      <div className="event-card__description">{`${event.info.description?.substring(
        0,
        100
      )}...`}</div>
      <div className="event-card__start-date">
        Дата начала: {event.info.dateStart.toLocaleDateString()}
      </div>
      {event.info.dateEnd && (
        <div className="event-card__date-duration">
          Длительность:{" "}
          {getDurationBetweenDates(event.info.dateStart, event.info.dateEnd)}
          <span className="event-card__likes-count">
            <AiOutlineLike style={iconsStyle} />
            {event.info.likes || 0}
          </span>
          <span className="event-card__dislikes-count">
            <AiOutlineDislike style={iconsStyle} />
            {event.info.dislikes || 0}
          </span>
          <span className="event-card__participants-count">
            <GoLocation style={iconsStyle} />
            {event.info.participants || 0}
          </span>
        </div>
      )}
    </section>
  );
}
