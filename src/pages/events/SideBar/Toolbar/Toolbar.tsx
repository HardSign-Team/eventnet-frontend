import React, { ChangeEvent, useEffect, useState } from "react";
import { Input, Gapped, TokenInput } from "@skbkontur/react-ui";
import "./Toolbar.css";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { Token } from "@skbkontur/react-ui";
import { TokenInputType } from "@skbkontur/react-ui/components/TokenInput";
import { observer } from "mobx-react-lite";
import globalStore from "../../../../stores/GlobalStore";
import { requestSearchByName } from "../../../../api/events/searchByName";
import { TagNameViewModel } from "../../../../viewModels/TagNameViewModel";
import { requestTags } from "../../../../api/tags/getTags";
import { throttle } from "lodash";
import { useLocation } from "react-router-dom";
import { requestEvents } from "../../../../api/events/getEvents";

interface FormData {
  eventName: string;
  currentCoordinates: string;
  tags: TagNameViewModel[];
}

const defaultData = {
  eventName: "",
  currentCoordinates: "",
  tags: [],
};

type Props = {
  onSubmit: (e: any) => void;
  onInputTag: (tags: TagNameViewModel[]) => void;
};

const Toolbar = observer(({ onSubmit, onInputTag }: Props) => {
  const [state, setState] = useState<FormData>(defaultData);
  const [isOpenEvent, setIsOpenEvent] = useState(true);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);

  useEffect(() => {
    if (state.eventName === "") {
      globalStore.eventLocationStore.allowAdding();
      if (query.toString() !== "") {
        requestEvents(query)
          .then(({ events }) => {
            globalStore.eventLocationStore.addRange(events);
            globalStore.eventStore.addEvents(events.map((event) => event.id));
          })
          .catch(console.error);
      }
      return;
    }
    globalStore.eventLocationStore.forbidAdding();
    const timeoutId = setTimeout(() => {
      requestSearchByName(state.eventName)
        .then((data) => data.events)
        .then((events) => events.map((event) => event.id))
        .then((guids) => {
          globalStore.eventStore.setEvents(guids);
        })
        .catch(console.error);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [state, state.eventName, query]);

  useEffect(() => {}, [state.tags]);

  const getItems = (q: string): Promise<never[]> =>
    Promise.resolve(
      state.tags
        .map((tagName) => tagName.name.toLowerCase())
        .filter((x) => x.includes(q.toLowerCase()) || x === q)
    ).then();

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
    if (latitude && longitude) {
      globalStore.mapStore.coordinates = [latitude, longitude];
    }
  };

  const onClick = (e: any) => {
    e.preventDefault();
    setIsOpenEvent(!isOpenEvent);
  };

  const handleSubmit = (e: any) => {
    onSubmit(e);
  };

  const { eventName, currentCoordinates } = state;

  const onInputValueChange = throttle((value: string) => {
    if (value === "") return;
    requestTags(value)
      .then((tags) => {
        const tagsForPush = [];
        for (let tag of tags) {
          if (!state.tags.some((t) => t.id === tag.id)) {
            tagsForPush.push(tag);
          }
        }
        state.tags.push(...tagsForPush);
      })
      .catch(console.error);
  }, 300);

  return (
    <div
      className={
        "toolbar-container " + (isOpenEvent ? "toolbar-show" : "toolbar-hidden")
      }
      style={{ maxHeight: "200%" }}
    >
      <form className="form-horizontal" onSubmit={handleSubmit}>
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
              renderAddButton={() => null}
              onInputValueChange={onInputValueChange}
              selectedItems={selectedItems}
              className="token-input"
              onValueChange={(tags) => {
                const tagsForFilter = state.tags.filter((t) =>
                  tags.some((tag) => tag === t.name)
                );
                onInputTag(tagsForFilter);
                setSelectedItems(tags);
              }}
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
