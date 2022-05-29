import React, { useEffect, useState } from "react";
import "./EventCard.module.scss";
import Event from "../../../models/Event";
import { getDurationBetweenDates } from "../../../utils/date";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import avatar from "../../../assets/avatar.jpg";
import { observer } from "mobx-react-lite";
import styles from "./EventCard.module.scss";
import cn from "classnames";
import Image from "../../../models/Image";
import { getEventPhotos } from "../../../api/events/getEventPhotos";

type EventCardProps = {
  event: Event;
};

const iconsStyle = {
  float: "right",
  borderRadius: "50%",
  backgroundColor: "#D7DCD7",
  display: "inline-block",
  width: "25px",
  height: "25px",
} as const;

const getDescription = (description: string) =>
  description.length < 60 ? description : `${description.substring(0, 60)}...`;

const EventCard = observer(({ event }: EventCardProps) => {
  const [photo, setPhoto] = useState<Image | null>(null);

  useEffect(() => {
    getEventPhotos(event.id)
      .then((resp) =>
        resp.photos.map(
          (photo) => ({ url: `${photo}.jpeg`, file: null } as Image)
        )
      )
      .then((photos) => photos.length > 0 && setPhoto(photos[0]));
  }, [event.id, setPhoto]);

  return (
    <section className={styles.eventCard}>
      <a href={`/event-page?id=${event.id}`}>
        <img
          className={styles.eventCard__photo}
          src={photo?.url ?? avatar}
          alt="EventPhoto"
          width={"100%"}
          height={"150px"}
        />
      </a>
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
