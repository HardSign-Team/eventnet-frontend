import React from "react";
import { DatePicker, Gapped } from "@skbkontur/react-ui";
import styles from "./EventDatetimePicker.module.scss";

type EventDatetimePickerProps = {
  date: string;
  time: string;
  label: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
};

const EventDatetimePicker: React.FC<EventDatetimePickerProps> = ({
  date,
  time,
  label,
  onDateChange,
  onTimeChange,
}) => {
  return (
    <Gapped gap={13} className={styles.eventDatetimePicker}>
      <span>{label}</span>
      <DatePicker value={date} onValueChange={onDateChange} />
      <span>в</span>
      <input
        type="time"
        value={time}
        onChange={(e) => onTimeChange(e.target.value)}
        className={styles.eventDatetimePicker__timeInput}
        required
      />
    </Gapped>
  );
};

export default EventDatetimePicker;
