import React, { useState } from "react";
import "./EventCreation.scss";
import { Checkbox, Gapped } from "@skbkontur/react-ui";
import EventDatetimePicker from "../EventDatetimePicker";
import EventDurationPicker from "../EventDurationPicker";

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
    <form className={"event-creation_form"} action="">
      <Gapped className={"event-creation"} vertical gap={20}>
        <div className={"photo-carousel"}>Выберите фото</div>
        <input
          className={"event_name-input"}
          placeholder={EVENT_NAME_PLACEHOLDER}
        />
        <EventDatetimePicker
          text={"Дата начала"}
          date={dateStart}
          time={timeStart}
          onDateChange={(value) => setDateStart(value)}
          onTimeChange={(value) => setTimeStart(value)}
        />
        <div className={["pickers_wrapper", "flex-row"].join(" ")}>
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
            className={"change-picker"}
          />
        </div>

        <Gapped
          gap={10}
          className={["event_place-picker", "flex-row"].join(" ")}
        >
          <span className={"place-picker_text"}>Координаты</span>
          <input
            type="text"
            className={"place-picker_input"}
            placeholder={"координатыssss"}
          />
          <a
            className={"map-link"}
            href={"#тут только карта с возможностью выбора места"}
          >
            выбрать на карте
          </a>
        </Gapped>
      </Gapped>
    </form>
  );
};

export default EventCreation;
