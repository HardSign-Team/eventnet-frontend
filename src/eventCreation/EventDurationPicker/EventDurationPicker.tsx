import React from "react";
import { Gapped } from "@skbkontur/react-ui";
import styles from "./EventDurationPicker.module.scss";

type EventDurationPickerProps = {
  duration: string;
  onDurationChange: (value: string) => void;
};

const EventDurationPicker: React.FC<EventDurationPickerProps> = ({
  duration,
  onDurationChange,
}) => {
  return (
    <Gapped gap={13} className={styles.eventDurationPicker}>
      <span className={styles.eventDurationPicker_text}>Продолжительность</span>
      <input
        type="time"
        value={duration}
        onChange={(e) => onDurationChange(e.target.value)}
        className={styles.eventDurationPicker_input}
        required
      />
    </Gapped>
  );
};

export default EventDurationPicker;
