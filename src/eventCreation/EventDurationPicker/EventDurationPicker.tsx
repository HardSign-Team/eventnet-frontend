import React from "react";
import { Gapped } from "@skbkontur/react-ui";
import cn from "classnames";
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
    <Gapped gap={13} className={styles.event_durationPicker}>
      <span className={styles.durationPicker_text}>Продолжительность</span>
      <input
        type="time"
        value={duration}
        onChange={(e) => onDurationChange(e.target.value)}
        className={styles.durationPicker_input}
        required
      />
    </Gapped>
  );
};

export default EventDurationPicker;
