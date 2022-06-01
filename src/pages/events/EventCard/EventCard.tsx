import React, { useEffect, useState } from "react";
import "./EventCard.module.scss";
import Event from "../../../models/Event";
import { getDurationBetweenDates } from "../../../utils/date";
import blankPhoto from "../../../assets/blank_photo.png";
import { observer } from "mobx-react-lite";
import styles from "./EventCard.module.scss";
import Image from "../../../models/Image";
import { getEventPhotos } from "../../../api/events/getEventPhotos";
import { EventButtons } from "../../../shared/EventButtons";
import { Link } from "react-router-dom";

type EventCardProps = {
  event: Event;
};

const EventCard = observer(({ event }: EventCardProps) => {
  const [photo, setPhoto] = useState<Image>({ url: blankPhoto, file: null });

  useEffect(() => {
    getEventPhotos(event.id)
      .then((resp) =>
        resp.photos.map((photo) => ({ url: photo, file: null } as Image))
      )
      .then((photos) => photos.length > 0 && setPhoto(photos[0]));
  }, [event.id, setPhoto]);

  return (
    <section className={styles.eventCard}>
      <Link to={`/event-page?id=${event.id}`}>
        <img
          className={styles.eventCard__photo}
          src={photo.url}
          alt="EventPhoto"
          width={"100%"}
          height={"160px"}
        />
      </Link>
      <div className={styles.eventInfo}>
        <h4 className={styles.eventCard__title}>{event.info.name}</h4>
        <div className={styles.eventCard__description}>
          {event.info.description}
        </div>
        <footer className={styles.eventCard__footer}>
          <div className={styles.eventCard__datesWrapper}>
            <div className={styles.eventCard__startDate}>
              Дата начала: {event.info.dateStart.toLocaleDateString()}
            </div>
            {event.info.dateEnd && (
              <div className={styles.eventCard__dateDuration}>
                Длительность:{" "}
                {getDurationBetweenDates(
                  event.info.dateStart,
                  event.info.dateEnd
                )}
              </div>
            )}
          </div>
          <EventButtons event={event} />
        </footer>
      </div>
    </section>
  );
});

export default EventCard;
