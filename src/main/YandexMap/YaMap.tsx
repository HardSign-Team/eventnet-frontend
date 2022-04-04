import { Circle, Clusterer, Map, YMaps } from "react-yandex-maps";
import React, { useState } from "react";
import "../Main.css";
import Event from "../../models/Event";
import { useGlobalContext } from "../Context";

const DEFAULT_ZOOM = 6;
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

export default function YaMap({ className }: { className: string }) {
  const events = Array<Event>();
  const { coordinates } = useGlobalContext();
  const defaultMapState = {
    center: [56.817076, 60.611855],
    zoom: DEFAULT_ZOOM,
    behaviors: ["default", "scrollZoom"],
  };

  const currentMapState = {
    center: coordinates || defaultMapState.center,
    zoom: MAX_ZOOM,
    behaviors: ["default", "scrollZoom"],
  };
  return (
    <YMaps>
      <Map
        style={mapStyle}
        defaultState={defaultMapState}
        state={currentMapState}
        width={WINDOW_WIDTH}
        height={WINDOW_HEIGHT}
        className={className}
        options={mapOptions}
      >
        <Clusterer>{createCircles(events)}</Clusterer>
      </Map>
    </YMaps>
  );
}
