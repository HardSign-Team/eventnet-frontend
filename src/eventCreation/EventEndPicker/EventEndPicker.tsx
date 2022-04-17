import React, { useState } from "react";
import styles from "./EventEndPicker.module.scss";
import EventDurationPicker from "../EventDurationPicker/EventDurationPicker";
import EventDatetimePicker from "../EventDatetimePicker/EventDatetimePicker";
import { Checkbox } from "@skbkontur/react-ui";

type EventEndPickerProps = {
  duration: string;
  setDuration: (value: string) => void;
  dateEnd: string;
  timeEnd: string;
  setDateEnd: (value: string) => void;
  setTimeEnd: (value: string) => void;
};

const EventEndPicker: React.FC<EventEndPickerProps> = ({
  duration,
  setDuration,
  dateEnd,
  timeEnd,
  setDateEnd,
  setTimeEnd,
}) => {
  const [isDurationPickerActive, setIsDurationPickerActive] = useState(true);

  return (
    <div className={styles.eventEndPicker}>
      {isDurationPickerActive ? (
        <EventDurationPicker
          duration={duration}
          onDurationChange={setDuration}
        />
      ) : (
        <EventDatetimePicker
          label={"Дата конца"}
          date={dateEnd}
          time={timeEnd}
          onDateChange={(value) => setDateEnd(value)}
          onTimeChange={setTimeEnd}
        />
      )}
      <Checkbox
        onChange={() => setIsDurationPickerActive(!isDurationPickerActive)}
        checked={isDurationPickerActive}
        className={styles.eventEndPicker__change}
      />
    </div>
  );
};

export default EventEndPicker;
