import { Clusterer, Map, YMaps } from "react-yandex-maps";
import React from "react";
import "../style.css";
import { observer } from "mobx-react-lite";
import globalStore from "../../../stores/GlobalStore";
import Circles from "./Circles/Circles";

const MIN_ZOOM = 4;

const mapStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
} as const;

const mapOptions = {
  exitFullscreenByEsc: true,
  minZoom: MIN_ZOOM,
  yandexMapAutoSwitch: true,
};

const { eventLocationStore, mapStore } = globalStore;

const YaMap = observer(({ className }: { className: string }) => {
  const currentMapState = {
    center: mapStore.coordinates,
    zoom: 10,
  };

  const onMapClick = (_: any) => {
  };

  return (
    <YMaps className="yandex-maps">
      <Map
        style={mapStyle}
        state={currentMapState}
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
        <Clusterer>
          <Circles events={eventLocationStore.getAll()} />
        </Clusterer>
      </Map>
    </YMaps>
  );
});

export default YaMap;
