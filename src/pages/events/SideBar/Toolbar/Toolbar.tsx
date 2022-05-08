import React, { ChangeEvent, useState } from "react";
import { Input, Gapped, TokenInput } from "@skbkontur/react-ui";
import "./Toolbar.css";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { Token } from "@skbkontur/react-ui";
import { TokenInputType } from "@skbkontur/react-ui/components/TokenInput";
import { observer } from "mobx-react-lite";
import globalStore from "../../../../stores/GlobalStore";

const tags = [
  "Бьюти",
  "Транспорт",
  "Иностранные языки",
  "Семья",
  "Животные",
  "Настроение",
  "Тренды",
  "Спорт",
  "Работа",
  "Мода",
  "Еда",
  "Путешествия",
  "Природа",
  "Интересы",
  "Юмор",
  "Селфи",
  "инстаграм",
  "инстаграманет",
  "инстаграмнедели",
  "инстаграм_порусски",
  "нста",
  "я",
  "улыбка",
  "селфи",
  "красота",
  "супер",
  "природа",
  "друзья",
  "дружба",
  "лайки",
  "фото",
  "фотография",
  "любовь",
  "любовьмоя",
  "девушки",
  "жизнь",
  "жизньпрекрасна",
  "инстаграманет",
  "красиво",
  "следуйзамной",
  "лайкизалайки",
  "лайкивinstagram",
  "лайкните",
  "лайк",
  "лайкивинстаграме",
  "селфи",
  "прическа",
  "причесон",
  "прическанадлинныеволосы",
  "прическамакияж",
  "причесочка",
  "инстамода",
  "укладка",
  "стрижка",
  "покраска",
  "покрасилась",
  "мелирование",
  "стиль",
  "стильно",
  "длинныеволосы",
];

export const getItems = (q: string): Promise<never[]> =>
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
      globalStore.mapStore.coordinates = [latitude, longitude];
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
      style={{ maxHeight: "200%" }}
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
              width={"100%"}
              value={eventName}
              placeholder="Концерт у Артема"
              onChange={onChangeEventName}
            />
          </label>
          <label>
            <div className="label">Введите координаты события</div>
            <Input
              width={"100%"}
              value={currentCoordinates}
              placeholder="56.817076, 60.611855"
              onChange={onChangeCoordinates}
            />
          </label>
          <label>
            <div className="label">Выберите подходящие теги</div>
            <TokenInput
              width={"100%"}
              type={TokenInputType.Combined}
              getItems={getItems}
              selectedItems={selectedItems}
              className="token-input"
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
    </div>
  );
});

export default Toolbar;
