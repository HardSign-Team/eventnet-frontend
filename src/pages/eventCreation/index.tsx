import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import EventDatetimePicker from "./EventDatetimePicker";
import CustomButton from "../../shared/CustomButton/CustomButton";
import EventEndPicker from "./EventEndPicker";
import PlacePicker from "./PlacePicker";
import TagsPicker from "./TagsPicker";
import DescriptionArea from "./DescriptionArea";
import PhotoCarousel from "../../shared/PhotoCarousel/Carousel/PhotoCarousel";
import {
  calculateDuration,
  calculateEndDatetime,
  createDateFrom,
} from "../../utils/datetimeHelpers";
import { cropped } from "../../utils/cropHelpers";
import { CreateEventModel } from "../../dto/CreateEventModel";
import { Location } from "../../dto/Location";
import { requestEventCreation } from "../../api/events/requestEventCreation";
import { createEvent } from "../../api/events/createEvent";
import { EventSaveStatus, getIsCreated } from "../../api/events/getIsCreated";
import { observer } from "mobx-react-lite";
import globalStore from "../../stores/GlobalStore";
import { StatusModal } from "./StatusModal";
import Image from "../../models/Image";

const MAX_EVENT_NAME_LENGTH = 50;
const MAX_EVENT_DESCRIPTION_LENGTH = 1000;
const MAX_RETRIES = 10;

const { userStore } = globalStore;

// TODO ограничения на инпуты
const EventCreation: React.FC = observer(() => {
  const [eventImages, setEventImages] = useState<Image[]>([]);
  const [eventName, setEventName] = useState("");
  const [duration, setDuration] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [eventDescription, setEventDescription] = useState("");

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [modalStatus, setModalStatus] = useState(EventSaveStatus.Saved);

  const closeStatusModal = () => {
    setShowStatusModal(false);
  };

  const openStatusModal = (status: EventSaveStatus) => {
    setModalStatus((_) => status);
    setShowStatusModal(true);
  };

  const updateEventName = (name: string) => {
    setEventName(cropped(name, MAX_EVENT_NAME_LENGTH));
  };

  const updateEventDescription = (description: string) => {
    setEventDescription(cropped(description, MAX_EVENT_DESCRIPTION_LENGTH));
  };

  const isDatesNotEmpty = () => {
    return dateStart && timeStart && dateEnd && timeEnd;
  };

  const isValidDates = () => {
    const start = createDateFrom(dateStart, timeStart);
    const end = createDateFrom(dateEnd, timeEnd);

    return end.getTime() - start.getTime() >= 0;
  };

  useEffect(() => {
    if (dateStart && timeStart && duration) {
      const [_dateEnd, _timeEnd] = calculateEndDatetime(
        dateStart,
        timeStart,
        duration
      );
      setDateEnd(_dateEnd);
      setTimeEnd(_timeEnd);
    }
  }, [dateStart, timeStart, duration]);

  useEffect(() => {
    if (isDatesNotEmpty()) {
      const newDuration = calculateDuration(
        dateStart,
        timeStart,
        dateEnd,
        timeEnd
      );
      // TODO поменять durationPicker т.к. он не умеет принимать время больше 23:59
      setDuration(newDuration);
    }
  }, [dateEnd, timeEnd]);

  const isValidData = () => {
    if (isDatesNotEmpty() && !isValidDates()) return false;

    return !!(
      eventName &&
      eventDescription &&
      coordinates &&
      dateStart &&
      timeStart
    );
  };

  const retryGetIsCreated = async (eventId: string) => {
    let counter = 0;

    return new Promise<EventSaveStatus>((resolve) => {
      const unsubscribe = setInterval(async () => {
        counter++;
        let status = await getIsCreated(userStore.accessToken, eventId);

        if (status === EventSaveStatus.Saved) {
          clearInterval(unsubscribe);
          resolve(status);
        }
        if (counter > MAX_RETRIES) {
          clearInterval(unsubscribe);
          resolve(EventSaveStatus.LongWaiting);
        }
      }, 1000);
    });
  };

  const handleEventCreation = async () => {
    if (!isValidData()) {
      openStatusModal(EventSaveStatus.NotSavedDueToError);
      return;
    }
    const [latitude, longitude] = coordinates.split(",").map((x) => +x.trim());

    const eventId = await requestEventCreation(userStore.accessToken);

    const event: CreateEventModel = {
      id: eventId,
      location: new Location(latitude, longitude),
      description: eventDescription,
      name: eventName,
      startDate: createDateFrom(dateStart, timeStart),
      tags: selectedTags,
      photos: eventImages,
    };

    if (dateEnd && timeEnd) event["endDate"] = createDateFrom(dateEnd, timeEnd);

    await createEvent(userStore.accessToken, event);

    const responseCode = await getIsCreated(userStore.accessToken, eventId);
    openStatusModal(responseCode);

    if (responseCode === EventSaveStatus.InProgress) {
      const newResponseCode = await retryGetIsCreated(eventId);
      openStatusModal(newResponseCode);
    }
  };

  return (
    <>
      {showStatusModal && (
        <StatusModal status={modalStatus} onClose={closeStatusModal} />
      )}
      <main className={styles.eventCreation}>
        <PhotoCarousel
          images={eventImages}
          withLoader={{ setImages: setEventImages }}
        />
        <input
          className={styles.event_nameInput}
          placeholder={"Введите название..."}
          value={eventName}
          onChange={(e) => updateEventName(e.target.value)}
        />
        <EventDatetimePicker
          label={"Дата начала"}
          date={dateStart}
          time={timeStart}
          onDateChange={(value) => setDateStart(value)}
          onTimeChange={(value) => setTimeStart(value)}
        />
        <EventEndPicker
          dateEnd={dateEnd}
          setDateEnd={setDateEnd}
          duration={duration}
          setDuration={setDuration}
          timeEnd={timeEnd}
          setTimeEnd={setTimeEnd}
        />
        <PlacePicker
          coordinates={coordinates}
          setCoordinates={setCoordinates}
        />
        <TagsPicker
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <DescriptionArea
          eventDescription={eventDescription}
          updateEventDescription={updateEventDescription}
        />
        <CustomButton
          width={480}
          height={40}
          label={"Создать событие"}
          onClick={handleEventCreation}
        />
      </main>
    </>
  );
});

export default EventCreation;
