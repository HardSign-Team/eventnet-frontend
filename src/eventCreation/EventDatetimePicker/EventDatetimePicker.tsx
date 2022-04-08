import React from "react";
import { DatePicker, Gapped } from "@skbkontur/react-ui";
import cn from "classnames";
import styles from "./EventDatetimePicker.module.scss";

type EventDatetimePickerProps = {
  date: string;
  time: string;
  text: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
};

const EventDatetimePicker: React.FC<EventDatetimePickerProps> = ({
  date,
  time,
  text,
  onDateChange,
  onTimeChange,
}) => {
  return (
    <Gapped gap={13} className={styles.event_datePicker}>
      <span className={styles.datePicker_text}>{text}</span>
      <DatePicker value={date} onValueChange={onDateChange} />
      <span className={styles.datePicker_text}>в</span>
      <input
        type="time"
        value={time}
        onChange={(e) => onTimeChange(e.target.value)}
        className={styles.timePicker_input}
        required
      />
    </Gapped>
  );
};

export default EventDatetimePicker;
