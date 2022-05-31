import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import PhotoCarousel from "../../shared/PhotoCarousel/Carousel/PhotoCarousel";
import { formatTimeString } from "../../utils/datetimeHelpers";
import Image from "../../models/Image";
import { useLocation } from "react-router-dom";
import { LoadSpinner } from "../../shared/LoadSpinner";
import EventInfo from "../../models/EventInfo";
import { requestEvent } from "../../api/events/getEvent";
import { eventViewModelToEvent } from "../../utils/convertHelper";
import blankPhoto from "../../assets/blank_photo.png";
import { getEventPhotos } from "../../api/events/getEventPhotos";
import { EventButtons } from "../../shared/EventButtons";
import { getDurationBetweenDates } from "../../utils/date";
import { isEventRelevant } from "../../utils/eventsHelper";

const defaultImage: Image = { url: blankPhoto as string, file: null };

export const EventPage: React.FC = () => {
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);

  const [eventId] = useState(query.get("id"));
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [eventPhotos, setEventPhotos] = useState<Image[] | null>(null);

  useEffect(() => {
    if (!eventId) return;
    requestEvent(eventId)
      .then((resp) => eventViewModelToEvent(resp.event))
      .then((event) => setEventInfo(event.info));

    getEventPhotos(eventId)
      .then((resp) =>
        resp.photos.map(
          (photo) => ({ url: photo, file: null } as Image)
        )
      )
      .then((photos) => photos.length > 0 && setEventPhotos(photos));
  }, [eventId]);

  return (
    <>
      {eventInfo && eventId ? (
        <div className={styles.eventPage}>
          <PhotoCarousel images={eventPhotos ?? [defaultImage]} />
          <div className={styles.wrapper}>
            <div className={styles.eventInfo}>
              <h2 className={styles.eventName}>{eventInfo.name}</h2>
              <p className={styles.eventDateStart}>
                Дата начала: {eventInfo.dateStart.toLocaleDateString()} в{" "}
                {formatTimeString(eventInfo.dateStart.toLocaleTimeString())}
              </p>
              {eventInfo.dateEnd && (
                <>
                  <p className={styles.eventDateEnd}>
                    Дата конца: {eventInfo.dateEnd.toLocaleDateString()} в{" "}
                    {formatTimeString(eventInfo.dateEnd.toLocaleTimeString())}
                  </p>
                  <p className={styles.eventDuration}>
                    Продолжительность:{" "}
                    {getDurationBetweenDates(
                      eventInfo.dateStart,
                      eventInfo.dateEnd
                    )}
                  </p>
                </>
              )}
            </div>
            <EventButtons event={{ id: eventId, info: eventInfo }} />
          </div>
          {!isEventRelevant(eventInfo) && (
            <p className={styles.eventStatus}>Событие уже завершилось(</p>
          )}
          <div className={styles.eventDescription}>
            <p className={styles.descriptionTitle}>Описание:</p>
            <p className={styles.description}>{eventInfo.description}</p>
          </div>
        </div>
      ) : (
        <div className={styles.spinnerWrapper}>
          <LoadSpinner />
        </div>
      )}
    </>
  );
};
