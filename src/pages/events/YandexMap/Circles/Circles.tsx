import React, { useState } from "react";
import Event from "../../../../models/Event";
import { Circle } from "react-yandex-maps";
import EventBalloonContent from "../EventBalloonContent/EventBalloonContent";
import ReactDOMServer from "react-dom/server";
import { EventLocationViewModel } from "../../../../viewModels/EvenLocationViewModel";

const CIRCLE_RADIUS = 5;
const CIRCLE_COLOR = "#008D8E";
const circleOptions = {
  fillColor: CIRCLE_COLOR,
  strokeColor: CIRCLE_COLOR,
  strokeOpacity: 1,
  strokeWidth: 15,
};

type Props = {
  events: EventLocationViewModel[];
};

const Circles = ({ events }: Props) => {
  const circles: Array<JSX.Element> = [];

  events.forEach((event) => {
    circles.push(
      <Circle
        geometry={[
          [event.location.latitude, event.location.longitude],
          CIRCLE_RADIUS,
        ]}
        options={circleOptions}
        key={event.id}
        // properties={{
        //   balloonContent: ReactDOMServer.renderToString(
        //     <EventBalloonContent
        //       className={"event-balloon-content"}
        //       event={event}
        //     />
        //   ),
        // }}
        modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
      />
    );
  });
  return <>{circles}</>;
};

export default Circles;
