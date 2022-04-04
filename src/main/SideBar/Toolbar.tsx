import React, { useState } from "react";
import { Input, Gapped } from "@skbkontur/react-ui";
import "./Toolbar.css";
import EventList from "../EventList/EventList";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

type FormData = {
  eventName: string;
  coordinates: string;
  tags: Array<string>;
};

const defaultData = {
  eventName: "",
  coordinates: "",
  tags: [],
};

export default function Toolbar(): JSX.Element {
  const [state, setState] = useState<FormData>(defaultData);
  const [isOpenEvent, setIsOpenEvent] = useState<boolean>(false);

  const onChange = (field: keyof FormData) => {
    return (value: string) => {
      setState({
        ...state,
        [field]: value,
      });
    };
  };

  const onClick = (e: any) => {
    e.preventDefault();
    setIsOpenEvent(!isOpenEvent);
  };

  const getLabel = (
    text: string,
    value: string,
    onChangeField: keyof FormData
  ) => {
    return (
      <label>
        <div className="label">{text}</div>
        <Input value={value} onValueChange={onChange(onChangeField)} />
      </label>
    );
  };

  const renderForm = () => {
    const { eventName, coordinates, tags } = state;
    return (
      <form className="form-horizontal">
        {isOpenEvent && (
          <Gapped gap={15} vertical>
            {getLabel("Введите название события", eventName, "eventName")}
            {getLabel("Введите координаты события", coordinates, "coordinates")}
            {getLabel("Выберите подходящие теги", tags[0], "tags")}
          </Gapped>
        )}
        <button className="button sidebar-btn" onClick={onClick}>
          {isOpenEvent ? <AiOutlineDown /> : <AiOutlineUp />}
        </button>
        <EventList />
      </form>
    );
  };
  return <div>{renderForm()}</div>;
}
