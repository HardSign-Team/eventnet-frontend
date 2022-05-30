import React from "react";
import "./Circles.scss";
import { Circle } from "react-yandex-maps";
import EventBalloonContent from "../EventBalloonContent/EventBalloonContent";
import ReactDOMServer from "react-dom/server";
import { EventLocationViewModel } from "../../../../viewModels/EvenLocationViewModel";
import { requestEvent } from "../../../../api/events/getEvent";
import { Coordinates } from "../../../../models/Coordinates";
import { guid } from "../../../../viewModels/Guid";
import globalStore from "../../../../stores/GlobalStore";
import {
  eventViewModelToEvent,
  locationToCoordinates,
} from "../../../../utils/convertHelper";

const CIRCLE_RADIUS = 5;
const CIRCLE_COLOR = "#008D8E";

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

type Props = {
  events: EventLocationViewModel[];
};

const Circles = ({ events }: Props) => {
  const circles: Array<JSX.Element> = [];
  const circleOptions = {
    fill: true,
    fillColor: CIRCLE_COLOR,
    strokeColor: CIRCLE_COLOR,
    opacity: 1,
    strokeOpacity: 1,
    strokeWidth: 15,
  };

  const onMouseEnter = async (c: any) => {
    const map = c.get("map");
    const coords = c.get("coords");
    const eventId = getEventId(events, coords);
    const event = await getEvent(eventId);

    globalStore.eventStore.addEvent(event);
    map.hint.open(
      c.get("coords"),
      ReactDOMServer.renderToString(
        <EventBalloonContent
          className={"event-balloon-content"}
          event={event}
        />
      ),
      {
        openTimeout: 0,
      }
    );
  };

  const onMouseLeave = async (c: any) => {
    const map = c.get("map");
    map.hint.close(true);
  };

  const onClick = () => {};

  events.forEach((e) => {
    circles.push(
      <Circle
        key={e.id}
        geometry={[locationToCoordinates(e.location), CIRCLE_RADIUS]}
        options={circleOptions}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
      />
    );
  });
  return <>{circles}</>;
};

export default Circles;
