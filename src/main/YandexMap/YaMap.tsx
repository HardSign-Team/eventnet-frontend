import { Circle, Clusterer, Map, YMaps } from "react-yandex-maps";
import React from "react";
import "../Main.css";
import Event from "../../models/Event";
import { observer } from "mobx-react-lite";
import globalStore from "../../stores/GlobalStore";

const CIRCLE_RADIUS = 5;
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
  width: "100%",
  height: "99%",
} as const;

const mapOptions = {
  exitFullscreenByEsc: true,
  minZoom: MIN_ZOOM,
  yandexMapAutoSwitch: true,
};

const { eventStore, mapStore } = globalStore;

type Props = { className: string; onClick?: () => void };
const YaMap = observer(({ className, onClick}: Props) => {
  const currentMapState = {
    center: mapStore.coordinates,
    zoom: 10,
  };

  const onMapClick = async () => {
    onClick?.();
  };

  return (
    <YMaps className="yandex-maps">
      <Map
        style={mapStyle}
        state={currentMapState}
        width={"100%"}
        height={"100%"}
        className={className}
        options={mapOptions}
        onClick={onMapClick}
        instanceRef={(map: any) => {
          if (map !== null) {
            map.behaviors.enable("scrollZoom");
            map.behaviors.disable("dblClickZoom");
            map.behaviors.disable("rightMouseButtonMagnifier");
          }
        }}
      >
        <Clusterer>{createCircles(eventStore.events)}</Clusterer>
      </Map>
    </YMaps>
  );
});

export default YaMap;
