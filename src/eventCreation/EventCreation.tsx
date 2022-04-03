import React from "react";
import "./EventCreation.scss";
import { Gapped } from "@skbkontur/react-ui";
import { CustomInput } from "../shared/CustomInput";

const EVENT_NAME_PLACEHOLDER = "Введите название...";

const EventCreation: React.FC = () => {
  return (
    <Gapped className={"event-creation"} vertical gap={10}>
      <div className={"photo-carousel"}>Выберите фото</div>
      <input
        className={"event_name-input"}
        placeholder={EVENT_NAME_PLACEHOLDER}
      />
      <Gapped gap={10} className={["event_date-picker", "flex-row"].join(" ")}>
        <span className={"date-picker_text"}>Запланировано на</span>
        <div className={"date-picker_plug"}>21.03.22</div>
        <span className={"date-picker_text"}>в</span>
        <input type="time" className={"time-picker_input"} required />
      </Gapped>
      <Gapped
        gap={10}
        className={["event_duration-picker", "flex-row"].join(" ")}
      >
        <span className={"duration-picker_text"}>Продолжительность</span>
        <input type="time" className={"time-picker_input"} required />
      </Gapped>
      <Gapped gap={10} className={["event_place-picker", "flex-row"].join(" ")}>
        <span className={"place-picker_text"}>Координаты</span>
        <input
          type="text"
          className={"place-picker_input"}
          placeholder={"координатыssss"}
        />
        <a className={"map-link"} href={'#тут только карта с возможностью выбора места'}>выбрать на карте</a>
      </Gapped>
    </Gapped>
  );
};

export default EventCreation;
