import React, { useEffect, useState } from "react";
import styles from "./EventCreation.module.scss";
import { Gapped } from "@skbkontur/react-ui";
import EventDatetimePicker from "../EventDatetimePicker/EventDatetimePicker";
import { CustomSelector } from "../../shared/CustomSelector/CustomSelector";
import CustomButton from "../../shared/CustomButton/CustomButton";
import EventEndPicker from "../EventEndPicker/EventEndPicker";
import PlacePicker from "../PlacePicker/PlacePicker";
import TagsPicker from "../TagsPicker/TagsPickerProps";
import DescriptionArea from "../DescriptionArea/DescriptionArea";
import PhotoCarousel from "../../shared/PhotoCarousel/Carousel/PhotoCarousel";

enum EventTypes {
  Public = "public",
  Private = "private",
}

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

  const calculateEndDatetime = (
    dateStart: string,
    timeStart: string,
    duration: string
  ) => {
    const [day, month, year] = dateStart.split(".").map(Number);
    const [hours, minutes] = timeStart.split(":").map(Number);
    const [durationHours, durationMinutes] = duration.split(":").map(Number);

    const dateObj = new Date(year, month - 1, day, hours, minutes);
    dateObj.setHours(dateObj.getHours() + durationHours);
    dateObj.setMinutes(dateObj.getMinutes() + durationMinutes);

    const _dateEnd = [
      dateObj.getDate(),
      dateObj.getMonth() + 1,
      dateObj.getFullYear(),
    ]
      .map((x) => x.toString().padStart(2, "0"))
      .join(".");

    const _timeEnd = [dateObj.getHours(), dateObj.getMinutes()]
      .map((x) => x.toString().padStart(2, "0"))
      .join(":");

    return [_dateEnd, _timeEnd];
  };

  const calculateDuration = (
    dateStart: string,
    timeStart: string,
    dateEnd: string,
    timeEnd: string
  ) => {
    const [dayStart, monthStart, yearStart] = dateStart.split(".").map(Number);
    const [hoursStart, minutesStart] = timeStart.split(":").map(Number);
    const [dayEnd, monthEnd, yearEnd] = dateEnd.split(".").map(Number);
    const [hoursEnd, minutesEnd] = timeEnd.split(":").map(Number);

    const datetimeStart = new Date(
      yearStart,
      monthStart - 1,
      dayStart,
      hoursStart,
      minutesStart
    ).getTime();
    const datetimeEnd = new Date(
      yearEnd,
      monthEnd - 1,
      dayEnd,
      hoursEnd,
      minutesEnd
    ).getTime();

    const hourDiff = datetimeEnd - datetimeStart;
    const minDiff = hourDiff / 60 / 1000;
    const hDiff = hourDiff / 3600 / 1000;

    const hours = Math.floor(hDiff);
    const minutes = minDiff - 60 * hours;

    return [hours, minutes].map((x) => x.toString().padStart(2, "0")).join(":");
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
          setImages={setEventImages}
          withLoader={true}
        />
        <input
          className={styles.event_nameInput}
          placeholder={"Введите название..."}
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
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
          setEventDescription={setEventDescription}
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
