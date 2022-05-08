import React from "react";
import "./EventCard.module.scss";
import Event from "../../../models/Event";
import { getDurationBetweenDates } from "../../../utils/date";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import avatar from "../../../assets/avatar.jpg";
import { observer } from "mobx-react-lite";
import styles from "./EventCard.module.scss";
import cn from "classnames";

type EventCardProps = {
  event: Event;
};

const iconsStyle = {
  float: "right",
  borderRadius: "50%",
  backgroundColor: "#D7DCD7",
  display: "inline-block",
  width: "16px",
  height: "16px",
} as const;

const getDescription = (description: string) =>
  description.length < 60 ? description : `${description.substring(0, 60)}...`;

const EventCard = observer(({ event }: EventCardProps) => {
  return (
    <section className={styles.eventCard}>
      <img
        className={styles.eventCard__photo}
        src={(event.info.photos && event.info.photos[0]) || avatar}
        alt="EventPhoto"
        width={"100%"}
        height={"125px"}
      />
      <div className={styles.eventInfo}>
        <h4 className={styles.eventCard__title}>{event.info.name}</h4>
        <div className={styles.eventCard__description}>
          {getDescription(event.info.description || "")}
        </div>
        <div className={styles.eventCard__startDate}>
          Дата начала: {event.info.dateStart.toLocaleDateString()}
        </div>
        {event.info.dateEnd && (
          <div className={styles.eventCard__dateDuration}>
            Длительность:{" "}
            {getDurationBetweenDates(event.info.dateStart, event.info.dateEnd)}
          </div>
        )}
        <div className={styles.buttons}>
          <button className={cn(styles.button)}>
            <AiOutlineLike style={iconsStyle} />
            {event.info.likes || 0}
          </button>
          <button className={cn(styles.button)}>
            <AiOutlineDislike style={iconsStyle} />
            {event.info.dislikes || 0}
          </button>
          <button className={cn(styles.button)}>
            <GoLocation style={iconsStyle} />
            {event.info.participants || 0}
          </button>
        </div>
      </div>
    </section>
  );
});

export default EventCard;
