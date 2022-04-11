import React, { useState } from "react";
import cn from "classnames";
import styles from "./EventCreation.module.scss";
import { Checkbox, Gapped } from "@skbkontur/react-ui";
import EventDatetimePicker from "../EventDatetimePicker/EventDatetimePicker";
import EventDurationPicker from "../EventDurationPicker/EventDurationPicker";

const EVENT_NAME_PLACEHOLDER = "Введите название...";

const EventCreation: React.FC = () => {
  const [isDurationPickerActive, setIsDurationPickerActive] = useState(true);
  const [duration, setDuration] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [timeEnd, setTimeEnd] = useState("");

  console.log(duration, dateStart, timeStart, dateEnd, timeEnd);

  return (
    <Gapped className={styles.eventCreation} vertical gap={20}>
      <div className={styles.photoCarousel}>Выберите фото</div>
      <input
        className={styles.event_nameInput}
        placeholder={EVENT_NAME_PLACEHOLDER}
      />
      <EventDatetimePicker
        text={"Дата начала"}
        date={dateStart}
        time={timeStart}
        onDateChange={(value) => setDateStart(value)}
        onTimeChange={(value) => setTimeStart(value)}
      />
      <div className={cn(styles.pickers_wrapper, styles.flexRow)}>
        {isDurationPickerActive ? (
          <EventDurationPicker
            duration={duration}
            onDurationChange={setDuration}
          />
        ) : (
          <EventDatetimePicker
            text={"Дата конца"}
            date={dateEnd}
            time={timeEnd}
            onDateChange={(value) => setDateEnd(value)}
            onTimeChange={setTimeEnd}
          />
        )}
        <Checkbox
          onChange={() => setIsDurationPickerActive(!isDurationPickerActive)}
          checked={isDurationPickerActive}
          className={styles.changePicker}
        />
      </div>

      <Gapped gap={10} className={cn(styles.event_placePicker, styles.flexRow)}>
        <span className={styles.placePicker_text}>Координаты</span>
        <input
          type="text"
          className={styles.placePicker_input}
          placeholder={"координатыssss"}
        />
        <a
          className={styles.mapLink}
          href={"#тут только карта с возможностью выбора места"}
        >
          выбрать на карте
        </a>
      </Gapped>
    </Gapped>
  );
};

export default EventCreation;
