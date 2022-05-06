import styles from "./index.module.scss";
import React from "react";
import PhotoCarousel from "../shared/PhotoCarousel/Carousel/PhotoCarousel";
import globalStore from "../stores/GlobalStore";
import Event from "../models/Event";
import { formatTimeString } from "../utils/datetimeHelpers";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import cn from "classnames";

const { eventStore } = globalStore;

type EventPageProps = {
  event?: Event;
};

const iconsStyle = {
  float: "right",
  borderRadius: "50%",
  backgroundColor: "#D7DCD7",
  display: "inline-block",
  width: "30px",
  height: "30px",
} as const;

// TODO убрать заглушку ивента
export const EventPage: React.FC<EventPageProps> = ({
  event = eventStore.events[0],
}) => {
  const eventInfo = event.info;

  return (
    <div className={styles.eventPage}>
      <PhotoCarousel images={eventInfo.photos ?? [""]} />
      <div className={styles.wrapper}>
        <div className={styles.eventInfo}>
          <h2 className={styles.eventName}>{eventInfo.name}</h2>
          <p className={styles.eventDateStart}>
            Дата начала: {eventInfo.dateStart.toLocaleDateString()} в{" "}
            {formatTimeString(eventInfo.dateStart.toLocaleTimeString())}
          </p>
          {eventInfo.dateEnd && (
            <p className={styles.eventDateEnd}>
              Дата конца: {eventInfo.dateEnd.toLocaleDateString()} в{" "}
              {formatTimeString(eventInfo.dateEnd.toLocaleTimeString())}
            </p>
          )}
        </div>
        <div className={styles.buttons}>
          <button className={cn(styles.button, styles.likes)}>
            <AiOutlineLike style={iconsStyle} />
            {eventInfo.likes || 0}
          </button>
          <button className={cn(styles.button, styles.dislikes)}>
            <AiOutlineDislike style={iconsStyle} />
            {eventInfo.dislikes || 0}
          </button>
          <button className={cn(styles.button, styles.participants)}>
            <GoLocation style={iconsStyle} />
            {eventInfo.participants || 0}
          </button>
        </div>
      </div>
      <div className={styles.eventDescription}>
        <p className={styles.descriptionTitle}>Описание:</p>
        <p className={styles.description}>{eventInfo.description}</p>
      </div>
      <div className={styles.comments}></div>
    </div>
  );
};
