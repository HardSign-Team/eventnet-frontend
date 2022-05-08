import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Gapped } from "@skbkontur/react-ui";
import EventDatetimePicker from "./EventDatetimePicker";
import { CustomSelector } from "../shared/CustomSelector/CustomSelector";
import CustomButton from "../shared/CustomButton/CustomButton";
import EventEndPicker from "./EventEndPicker";
import PlacePicker from "./PlacePicker";
import TagsPicker from "./TagsPicker";
import DescriptionArea from "./DescriptionArea";
import PhotoCarousel from "../shared/PhotoCarousel/Carousel/PhotoCarousel";
import {
  calculateDuration,
  calculateEndDatetime,
} from "../utils/datetimeHelpers";
import { cropped } from "../utils/cropHelpers";

enum EventTypes {
  Public = "public",
  Private = "private",
}

const MAX_EVENT_NAME_LENGTH = 50;
const MAX_EVENT_DESCRIPTION_LENGTH = 1000;

// TODO ограничения на инпуты
const EventCreation: React.FC = () => {
  const [eventImages, setEventImages] = useState<string[]>([]);
  const [eventName, setEventName] = useState("");
  const [duration, setDuration] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [eventType, setEventType] = useState(EventTypes.Public);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [eventDescription, setEventDescription] = useState("");

  const updateEventName = (name: string) => {
    setEventName(cropped(name, MAX_EVENT_NAME_LENGTH));
  };

  const updateEventDescription = (description: string) => {
    setEventDescription(cropped(description, MAX_EVENT_DESCRIPTION_LENGTH));
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
    if (dateStart && dateEnd && timeEnd) {
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

  const createEvent = () => {};

  return (
    <>
      <Gapped className={styles.eventCreation} vertical gap={20}>
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
        <CustomSelector
          classNameDiv={styles.eventType_selector}
          onChange={setEventType}
          first={EventTypes.Public}
          second={EventTypes.Private}
          firstLabel={"Публичное"}
          secondLabel={"Приватное"}
          value={eventType}
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
          onClick={createEvent}
        />
      </Gapped>
    </>
  );
};

export default EventCreation;
