import React from "react";
import Event from "../../../../models/Event";
import { Circle } from "react-yandex-maps";
import EventBalloonContent from "../EventBalloonContent/EventBalloonContent";
import ReactDOMServer from "react-dom/server";

const CIRCLE_RADIUS = 5;
const CIRCLE_COLOR = "#008D8E";
const circleOptions = {
  fillColor: CIRCLE_COLOR,
  strokeColor: CIRCLE_COLOR,
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
