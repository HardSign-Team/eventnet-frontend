import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import PhotoCarousel from "../../shared/PhotoCarousel/Carousel/PhotoCarousel";
import { formatTimeString } from "../../utils/datetimeHelpers";
import Image from "../../models/Image";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadSpinner } from "../../shared/LoadSpinner";
import EventInfo from "../../models/EventInfo";
import { requestEvent } from "../../api/events/getEvent";
import { eventViewModelToEvent } from "../../utils/convertHelper";
import blankPhoto from "../../assets/blank_photo.png";
import { getEventPhotos } from "../../api/events/getEventPhotos";
import { EventButtons } from "../../shared/EventButtons";
import { getDurationBetweenDates } from "../../utils/date";
import { isEventRelevant } from "../../utils/eventsHelper";
import { getUserShortInfo } from "../../api/users/getUserShortInfo";
import { BASE_ROUTE } from "../../api/utils";
import defaultAvatar from "../../assets/avatar.jpg";
import { toast, ToastContainer } from "react-toast";
import { YANDEX_MAP_ACCESS_TOKEN } from "../events/YandexMap/YaMap";
import { getAddress } from "../../api/getAddress";
import CustomButton from "../../shared/CustomButton/CustomButton";
import EventCreation from "../eventCreation";

const defaultImage: Image = { url: blankPhoto as string, file: null };

export const EventPage: React.FC = () => {
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);

  const [eventId] = useState(query.get("id"));
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [eventPhotos, setEventPhotos] = useState<Image[] | undefined>(
    undefined
  );

  const [ownerName, setOwnerName] = useState("");
  const [ownerAvatar, setOwnerAvatar] = useState<Image | null>(null);

  const [address, setAddress] = useState<string | null>(null);

  const [isEditEvent, setIsEditEvent] = useState(false);

  useEffect(() => {
    if (!eventId) return;
    requestEvent(eventId)
      .then((resp) => eventViewModelToEvent(resp.event))
      .then((event) => setEventInfo(event.info));

    getEventPhotos(eventId)
      .then((resp) =>
        resp.photos.map((photo) => ({ url: photo, file: null } as Image))
      )
      .then((photos) => photos.length > 0 && setEventPhotos(photos));
  }, [eventId]);

  useEffect(() => {
    if (!eventInfo) return;

    getUserShortInfo(eventInfo.ownerId).then((resp) => {
      setOwnerName(resp.userName);
      setOwnerAvatar({
        url:
          resp.avatarUrl !== "default-avatar.jpeg"
            ? `${BASE_ROUTE}/${resp.avatarUrl}?width=512&height=512`
            : defaultAvatar,
        file: null,
      });
    });

    getAddress(eventInfo, YANDEX_MAP_ACCESS_TOKEN).then((address) =>
      setAddress(`${address.description}, ${address.name}`)
    );
  }, [eventInfo]);

  const copyTagName = (name: string) => {
    navigator.clipboard.writeText(name).then((r) =>
      toast(`Скопирован тег "${name}"!`, {
        backgroundColor: "#008D8E",
        color: "#ffffff",
      })
    );
  };

  const editEvent = () => {
    setIsEditEvent(!isEditEvent);
  };

  return (
    <>
      {eventInfo && eventId ? (
        isEditEvent ? (
          <EventCreation
            eventName={eventInfo.name}
            eventImages={eventPhotos}
            eventDescriptions={eventInfo.description}
            coordinates={eventInfo.coordinates}
            dateEnd={eventInfo.dateEnd}
            dateStart={eventInfo.dateStart}
            selectedTags={eventInfo.tags}
          />
        ) : (
          <div className={styles.eventPage}>
            <ToastContainer delay={2500} />
            <PhotoCarousel images={eventPhotos ?? [defaultImage]} />
            <div className={styles.wrapper}>
              <div className={styles.eventInfo}>
                <h2 className={styles.eventName} title={eventInfo.name}>
                  {eventInfo.name}
                </h2>
                <p className={styles.eventDateStart}>
                  Дата начала: {eventInfo.dateStart.toLocaleDateString()} в{" "}
                  {formatTimeString(eventInfo.dateStart.toLocaleTimeString())}
                </p>
                {eventInfo.dateEnd !== null && (
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
              <div className={styles.buttonsWrapper}>
                {ownerName && ownerAvatar && (
                  <div
                    className={styles.eventOwner__info}
                    title={`Создатель события: ${ownerName}`}
                  >
                    <p className={styles.eventOwner__info_name}>{ownerName}</p>
                    &nbsp;
                    <img
                      className={styles.eventOwner__info_avatar}
                      src={ownerAvatar.url}
                      alt={"owner avatar"}
                      width={40}
                      height={40}
                    />
                  </div>
                )}
                <EventButtons event={{ id: eventId, info: eventInfo }} />
              </div>
            </div>
            {address && (
              <div className={styles.eventAddress}>
                <p className={styles.eventAddress__title}>Адрес:</p>
                <p className={styles.eventAddress__text}>{address}</p>
              </div>
            )}
            {eventInfo.tags.length > 0 && (
              <div className={styles.eventTags}>
                <p className={styles.eventTags__tagsTitle}>Теги:</p>
                <div className={styles.eventTags__wrapper}>
                  {eventInfo.tags.map((x) => (
                    <div
                      className={styles.eventTags__wrapper__tag}
                      key={x.id}
                      onClick={() => copyTagName(x.name)}
                    >
                      {x.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!isEventRelevant(eventInfo) && (
              <p className={styles.eventStatus}>Событие уже завершилось(</p>
            )}
            <div className={styles.eventDescription}>
              <p className={styles.eventDescription__title}>Описание:</p>
              <p className={styles.eventDescription__text}>
                {eventInfo.description}
              </p>
            </div>
            <div className={styles.editButton}>
              <CustomButton label="Редактировать" onClick={editEvent} />
            </div>
          </div>
        )
      ) : (
        <div className={styles.spinnerWrapper}>
          <LoadSpinner />
        </div>
      )}
    </>
  );
};
