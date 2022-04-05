import { Circle, Clusterer, Map, YMaps } from "react-yandex-maps";
import React from "react";
import "../Main.css";
import Event from "../../models/Event";
import { observer } from "mobx-react-lite";
import mapStore from "../../stores/MapStore";
import eventStore from "../../stores/EventStore";

const CIRCLE_RADIUS = 150;
const WINDOW_WIDTH: number = window.screen.width;
const WINDOW_HEIGHT: number = window.screen.height;
const MAX_ZOOM = 15;
const MIN_ZOOM = 4;

const circleOptions = {
  fillColor: "#008D8E",
  strokeColor: "#008D8E",
  strokeOpacity: 0.9,
  strokeWidth: 10,
};
function createCircles(events: Array<Event>) {
  const circles: Array<JSX.Element> = [];
  events.forEach((event) => {
    circles.push(
      <Circle
        geometry={[event.info.coordinates, CIRCLE_RADIUS]}
        options={circleOptions}
        key={event.id}
      />
    );
  });
  return circles;
}

const mapStyle = {
  position: "absolute",
  margin: "0",
  padding: "0",
  width: "100%",
  height: "100%",
} as const;

const mapOptions = {
  exitFullscreenByEsc: true,
  maxZoom: MAX_ZOOM,
  minZoom: MIN_ZOOM,
  yandexMapAutoSwitch: true,
};

const YaMap = observer(({ className }: { className: string }) => {
  const currentMapState = {
    center: mapStore.coordinates,
    zoom: 10,
    behaviors: ["default", "scrollZoom"],
  };

  const onMapClick = (event: any) => {
    const currentCoordinates = event.get("coords");
  };

  return (
    <YMaps className="yandex-maps">
      <Map
        style={mapStyle}
        state={currentMapState}
        width={WINDOW_WIDTH}
        height={WINDOW_HEIGHT}
        className={className}
        options={mapOptions}
        onClick={onMapClick}
      >
        <Clusterer>{createCircles(eventStore.events)}</Clusterer>
      </Map>
    </YMaps>
  );
});

export default YaMap;
