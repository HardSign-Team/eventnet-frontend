import React from "react";
import { DatePicker, Gapped } from "@skbkontur/react-ui";

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
    <Gapped gap={13} className={["event_date-picker", "flex-row"].join(" ")}>
      <span className={"date-picker_text"}>{text}</span>
      <DatePicker value={date} onValueChange={onDateChange} />
      <span className={"date-picker_text"}>в</span>
      <input
        type="time"
        value={time}
        onChange={(e) => onTimeChange(e.target.value)}
        className={"time-picker_input"}
        required
      />
    </Gapped>
  );
};

export default EventDatetimePicker;
