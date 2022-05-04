import React, { useState } from "react";
import Event from "../../..//models/Event";
import { Circle } from "react-yandex-maps";
import EventBalloonContent from "../EventBalloonContent/EventBalloonContent";
import { DEFAULT_EVENT_PHOTO_URL } from "../../EventCard/EventCard";
import ReactDOMServer from "react-dom/server";

const CIRCLE_RADIUS = 5;
const circleOptions = {
  fillColor: "#008D8E",
  strokeColor: "#008D8E",
  strokeOpacity: 0.9,
  strokeWidth: 10,
};

type Props = {
  events: Event[];
};

const Circles = ({ events }: Props) => {
  const circles: Array<JSX.Element> = [];

  events.forEach((event) => {
    circles.push(
      <Circle
        geometry={[event.info.coordinates, CIRCLE_RADIUS]}
        options={circleOptions}
        key={event.id}
        properties={{
          balloonContent: ReactDOMServer.renderToString(
            <EventBalloonContent
              className={"event-balloon-content"}
              event={event}
            />
          ),
        }}
        modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
      />
    );
  });
  return <>{circles}</>;
};

export default Circles;
