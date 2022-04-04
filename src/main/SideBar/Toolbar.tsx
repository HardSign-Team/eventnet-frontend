import React, { ChangeEvent, useState } from "react";
import { Input, Gapped, TokenInput } from "@skbkontur/react-ui";
import "./Toolbar.css";
import EventList from "../EventList/EventList";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { Token } from "@skbkontur/react-ui";
import { TokenInputType } from "@skbkontur/react-ui/components/TokenInput";

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

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

const getItems = (q: string): Promise<never[]> =>
  Promise.resolve(
    tags.filter(
      (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString() === q
    )
  ).then();

const tokenColors: Record<number | string, { idle: any; active: any }> = {
  0: {
    idle: "grayIdle",
    active: "grayActive",
  },
  1: {
    idle: "blueIdle",
    active: "blueActive",
  },
  2: {
    idle: "greenIdle",
    active: "greenActive",
  },
  3: {
    idle: "yellowIdle",
    active: "yellowActive",
  },
  4: {
    idle: "redIdle",
    active: "redActive",
  },
  5: {
    idle: "white",
    active: "black",
  },
  default: {
    idle: "defaultIdle",
    active: "defaultActive",
  },
};

type FormData = {
  eventName: string;
  coordinates: string;
};

const defaultData = {
  eventName: "",
  coordinates: "",
};

export default function Toolbar(): JSX.Element {
  const [state, setState] = useState<FormData>(defaultData);
  const [isOpenEvent, setIsOpenEvent] = useState<boolean>(true);
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
    setState({
      ...state,
      coordinates: e.target.value,
    });
  };

  const onClick = (e: any) => {
    e.preventDefault();
    setIsOpenEvent(!isOpenEvent);
  };

  const { eventName, coordinates } = state;

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
                value={coordinates}
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
                <Token
                  key={item}
                  colors={
                    tokenColors[
                      getRandomInt(Object.keys(tokenColors).length - 1)
                    ] || tokenColors.default
                  }
                  {...tokenProps}
                >
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
