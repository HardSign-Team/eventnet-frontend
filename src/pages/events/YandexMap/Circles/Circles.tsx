import React from "react";
import "./Circles.scss";
import { Circle } from "react-yandex-maps";
import EventBalloonContent from "../EventBalloonContent/EventBalloonContent";
import { EventLocationViewModel } from "../../../../viewModels/EvenLocationViewModel";
import { requestEvent } from "../../../../api/events/getEvent";
import { Coordinates } from "../../../../models/Coordinates";
import { guid } from "../../../../viewModels/Guid";
import globalStore from "../../../../stores/GlobalStore";
import {
  eventViewModelToEvent,
  locationToCoordinates,
} from "../../../../utils/convertHelper";
import ReactDOM from "react-dom";

const CIRCLE_RADIUS = 5;
const CIRCLE_COLOR = "#008D8E";
const CARD_WIDTH = 280;
const CARD_HEIGHT = 320;

const getEvent = async (eventId: guid) => {
  const evm = await requestEvent(eventId);
  return eventViewModelToEvent(evm.event);
};

const getEventId = (events: EventLocationViewModel[], coords: Coordinates) => {
  let eventId = "";
  let min = 10000;
  events.forEach((e) => {
    const dx = Math.abs(coords[0] - e.location.latitude);
    const dy = Math.abs(coords[1] - e.location.longitude);
    if (dx * dx + dy * dy < min) {
      eventId = e.id;
      min = dx * dx + dy * dy;
    }
  });
  return eventId;
};

const circleOptions = {
  fill: true,
  fillColor: CIRCLE_COLOR,
  strokeColor: CIRCLE_COLOR,
  opacity: 1,
  strokeOpacity: 1,
  strokeWidth: 15,
};

const getTranslate = (x: number, y: number) => {
  let dx = -CARD_WIDTH / 2;
  let dy = -65;
  const vph = document.documentElement.clientHeight;
  const vpw = document.documentElement.clientWidth;

  if (y + CARD_HEIGHT > vph) {
    if (x + CARD_WIDTH > vpw) {
      dx += -CARD_WIDTH / 3 - 40;
    }
    if (x - CARD_WIDTH < 0) {
      dx += CARD_WIDTH / 3 + 20;
    }
    dy += -CARD_HEIGHT - 20;
  } else if (x + CARD_WIDTH > vpw) {
    dx += -CARD_WIDTH / 3 - 40;
    dy += -10;
  } else if (x - CARD_WIDTH < 0) {
    dx += CARD_WIDTH / 2 + 20;
    dy += -10;
  }
  return [dx, dy];
};

type Props = {
  events: EventLocationViewModel[];
};

const Circles = ({ events }: Props) => {
  const circles: Array<JSX.Element> = [];

  const onMouseLeave = async (e: any) => {
    const modal = document.getElementsByClassName(
      "popup-modal-window"
    )[0] as HTMLElement;
    modal.style.display = "none";
  };

  const onMouseEnter = async (e: any) => {
    const coords = e.get("coords");
    const eventId = getEventId(events, coords);
    const event = await getEvent(eventId);

    globalStore.eventStore.addEvent(event);

    const modal = document.getElementsByClassName(
      "popup-modal-window"
    )[0] as HTMLElement;
    modal.style.display = "block";

    const x = e.get("clientX");
    const y = e.get("clientY");
    const [dx, dy] = getTranslate(x, y);
    modal.style.top = y + dy + "px";
    modal.style.left = x + dx + "px";
    ReactDOM.render(
      <EventBalloonContent className={"event-balloon-content"} event={event} />,
      modal
    );
  };

  events.forEach((e) => {
    circles.push(
      <Circle
        key={e.id}
        geometry={[locationToCoordinates(e.location), CIRCLE_RADIUS]}
        options={circleOptions}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
      />
    );
  });
  return <>{circles}</>;
};

export default Circles;
