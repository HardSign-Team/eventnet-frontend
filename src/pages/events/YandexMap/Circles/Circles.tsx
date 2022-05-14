import React from "react";
import { Circle } from "react-yandex-maps";
import {EventLocationViewModel} from "../../../../viewModels/EvenLocationViewModel";

const CIRCLE_RADIUS = 5;
const circleOptions = {
  fillColor: "#008D8E",
  strokeColor: "#008D8E",
  strokeOpacity: 0.9,
  strokeWidth: 10,
};

type Props = {
  events: EventLocationViewModel[];
};

const Circles = ({ events }: Props) => {
  const circles: Array<JSX.Element> = [];

  events.forEach((event) => {
    const location = [event.location.latitude, event.location.longitude];
    circles.push(
      <Circle
        geometry={[location, CIRCLE_RADIUS]}
        options={circleOptions}
        key={event.id}
        properties={{
          // balloonContent: ReactDOMServer.renderToString(
          //   <EventBalloonContent
          //     className={"event-balloon-content"}
          //     event={event}
          //   />
          // ),
        }}
        modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
      />
    );
  });
  return <>{circles}</>;
};

export default Circles;
