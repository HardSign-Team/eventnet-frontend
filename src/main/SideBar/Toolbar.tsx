import React, { ChangeEvent, useState } from "react";
import { Input, Gapped, TokenInput } from "@skbkontur/react-ui";
import "./Toolbar.css";
import EventList from "../EventList/EventList";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { Token } from "@skbkontur/react-ui";
import { TokenInputType } from "@skbkontur/react-ui/components/TokenInput";
import { useGlobalContext } from "../../contexts/MapContext";

const tags = [
  "ЖОПА",
  "ОГОНЬ",
  "КРУТА",
  "ЗАМЕЧАТЛЬНО",
  "ТОПОВО",
  "ОПУПЕННО",
  "красота",
  "кенигсберг",
  "море",
  "история",
  "музеи",
  "архитектура",
];

const getItems = (q: string): Promise<never[]> =>
  Promise.resolve(
    tags.filter(
      (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString() === q
    )
  ).then();

type FormData = {
  eventName: string;
  currentCoordinates: string;
};

const defaultData = {
  eventName: "",
  currentCoordinates: "",
};

export default function Toolbar(): JSX.Element {
  const [state, setState] = useState<FormData>(defaultData);
  const [isOpenEvent, setIsOpenEvent] = useState<boolean>(true);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const { setCoordinates } = useGlobalContext();

  const onChangeEventName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({
      ...state,
      eventName: e.target.value,
    });
  };

  const onChangeCoordinates = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const coordString = e.target.value;
    const [latitude, longitude] = coordString.split(", ").map((x) => +x);
    setState({
      ...state,
      currentCoordinates: e.target.value,
    });
    if (latitude && longitude) setCoordinates([latitude, longitude]);
  };

  const onClick = (e: any) => {
    e.preventDefault();
    setIsOpenEvent(!isOpenEvent);
  };

  const { eventName, currentCoordinates } = state;

  return (
    <div>
      <form className="form-horizontal">
        {isOpenEvent && (
          <Gapped gap={15} vertical>
            <label>
              <div className="label">Введите название события</div>
              <Input
                value={eventName}
                placeholder="Концерт у Артема"
                onChange={onChangeEventName}
              />
            </label>
            <label>
              <div className="label">Введите координаты события</div>
              <Input
                value={currentCoordinates}
                placeholder="56.817076, 60.611855"
                onChange={onChangeCoordinates}
              />
            </label>
            <TokenInput
              type={TokenInputType.Combined}
              getItems={getItems}
              selectedItems={selectedItems}
              placeholder="Выберите подходящие теги"
              onValueChange={setSelectedItems}
              renderToken={(item, tokenProps) => (
                <Token key={item} {...tokenProps}>
                  {item}
                </Token>
              )}
            />
          </Gapped>
        )}
        <button className="button sidebar-btn" onClick={onClick}>
          {isOpenEvent ? <AiOutlineDown /> : <AiOutlineUp />}
        </button>
        <EventList />
      </form>
    </div>
  );
}
