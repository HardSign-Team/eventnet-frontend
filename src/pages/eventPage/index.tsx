import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import PhotoCarousel from "../../shared/PhotoCarousel/Carousel/PhotoCarousel";
import { formatTimeString } from "../../utils/datetimeHelpers";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import cn from "classnames";
import Image from "../../models/Image";
import { useLocation } from "react-router-dom";
import { LoadSpinner } from "../../shared/LoadSpinner";
import EventInfo from "../../models/EventInfo";
import { requestEvent } from "../../api/events/getEvent";
import { eventViewModelToEvent } from "../../utils/convertHelper";
import avatar from "../../assets/avatar.jpg";
import { getEventPhotos } from "../../api/events/getEventPhotos";

const iconsStyle = {
  float: "right",
  borderRadius: "50%",
  backgroundColor: "#D7DCD7",
  display: "inline-block",
  width: "30px",
  height: "30px",
} as const;

const defaultImage: Image = { url: avatar as string, file: null };

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
          (photo) => ({ url: `${photo}.jpeg`, file: null } as Image)
        )
      )
      .then((photos) => photos.length > 0 && setEventPhotos(photos));
  }, [eventId]);

  return (
    <>
      {eventInfo ? (
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
        </div>
      ) : (
        <div className={styles.spinnerWrapper}>
          <LoadSpinner />
        </div>
      )}
    </>
  );
};
