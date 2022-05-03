import React, { useState } from "react";
import styles from "./index.scss";
import EventDurationPicker from "../EventDurationPicker";
import EventDatetimePicker from "../EventDatetimePicker";
import { CustomSelector } from "../../shared/CustomSelector/CustomSelector";

enum SelectorStates {
  Duration = "duration",
  DateEnd = "dateEnd",
}

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
  const [picked, setPicked] = useState("duration");

  return (
    <>
      <CustomSelector
        onChange={setPicked}
        first={SelectorStates.Duration}
        second={SelectorStates.DateEnd}
        firstLabel={"Время"}
        secondLabel={"Дата"}
        value={picked}
      />
      <div className={styles.eventEndPicker}>
        {picked === "duration" ? (
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
      </div>
    </>
  );
};

export default EventEndPicker;
