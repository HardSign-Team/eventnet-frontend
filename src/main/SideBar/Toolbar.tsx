import React, { ChangeEvent, useState } from "react";
import { Input, Gapped, TokenInput } from "@skbkontur/react-ui";
import "./Toolbar.css";
import EventList from "../EventList/EventList";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { Token } from "@skbkontur/react-ui";
import { TokenInputType } from "@skbkontur/react-ui/components/TokenInput";
import { observer } from "mobx-react-lite";
import globalStore from "../../stores/GlobalStore";
import { slide as Menu } from "react-burger-menu";

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
  "ЖОПА",
  "ОГОНЬ",
  "КРУТА",
  "ЗАМЕЧАТЛЬНО",
  "ТОПОВО",
  "ОПУПЕННО",
  "красота",
  "кенигсберг",
  "море",
  "море",
];

const getItems = (q: string): Promise<never[]> =>
  Promise.resolve(
    tags
      .filter(
        (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString() === q
      )
      .map((x) => x.toLowerCase())
  ).then();

type FormData = {
  eventName: string;
  currentCoordinates: string;
};

const defaultData = {
  eventName: "",
  currentCoordinates: "",
};

const Toolbar = observer(() => {
  const [state, setState] = useState<FormData>(defaultData);
  const [isOpenEvent, setIsOpenEvent] = useState(true);
  const [selectedItems, setSelectedItems] = React.useState([]);

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
    if (latitude && longitude)
      globalStore.mapStore.setCoordinates([latitude, longitude]);
  };

  const onClick = (e: any) => {
    e.preventDefault();
    setIsOpenEvent(!isOpenEvent);
  };

  const { eventName, currentCoordinates } = state;

  return (
    <div
      className={
        "toolbar-container " + (isOpenEvent ? "toolbar-show" : "toolbar-hidden")
      }
    >
      <form className="form-horizontal">
        <Gapped
          gap={15}
          vertical
          className={
            isOpenEvent ? "toolbar__form-show" : "toolbar__form-hidden"
          }
        >
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
          <label>
            <div className="label">Выберите подходящие теги</div>
            <TokenInput
              type={TokenInputType.Combined}
              getItems={getItems}
              selectedItems={selectedItems}
              className="token-input"
              maxMenuHeight={"20vh"}
              onValueChange={setSelectedItems}
              renderToken={(item, tokenProps) => (
                <Token key={item} {...tokenProps}>
                  {item}
                </Token>
              )}
            />
          </label>
        </Gapped>
        <button className="button sidebar-btn" onClick={onClick}>
          {!isOpenEvent ? <AiOutlineDown /> : <AiOutlineUp />}
        </button>
      </form>
      <hr className="toolbar__horizontal-line" />
      <EventList isOpenEvent={isOpenEvent} />
    </div>
  );
});

export default Toolbar;
