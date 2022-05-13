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

const { eventStore, mapStore } = globalStore;

type Props = { className: string; onClick?: () => void };
const YaMap = observer(({ className, onClick }: Props) => {
  const currentMapState = {
    center: mapStore.coordinates,
    zoom: 10,
  };

  const closeCurrentBalloon = () => {
    const close: any = document.querySelector(
      'ymaps[class$="-balloon__close-button"]'
    );
    if (close != null) {
      close.click();
    }
  };

  const onMapClick = async (event: any) => {
    closeCurrentBalloon();
    const currentCoordinates = event.get("coords");
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
        <Clusterer>
          <Circles events={eventStore.events} />
        </Clusterer>
      </Map>
    </YMaps>
  );
});

export default YaMap;
