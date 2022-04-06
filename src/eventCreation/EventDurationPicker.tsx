import React from "react";
import { Gapped } from "@skbkontur/react-ui";

type EventDurationPickerProps = {
  duration: string
  onDurationChange: (value: string) => void
}

const EventDurationPicker: React.FC<EventDurationPickerProps> = ({duration, onDurationChange}) => {
  return (
    <Gapped
      gap={13}
      className={["event_duration-picker", "flex-row"].join(" ")}
    >
      <span className={"duration-picker_text"}>Продолжительность</span>
      <input type="time" value={duration} onChange={e => onDurationChange(e.target.value)} className={"time-picker_input"} required />
    </Gapped>
  );
};

export default EventDurationPicker;
