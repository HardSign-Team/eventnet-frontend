import {
  Button,
  Clusterer,
  Map,
  SearchControl,
  YMaps,
  ZoomControl,
} from "react-yandex-maps";
import React, { useState } from "react";
import "../style.css";
import { observer } from "mobx-react-lite";
import globalStore from "../../../stores/GlobalStore";
import Circles from "./Circles/Circles";
import "./YaMap.scss";
import { BiHide, BiShow } from "react-icons/bi";
import ReactDOMServer from "react-dom/server";
import { getDistanceFromLatLonInKm } from "../../../utils/distance";

const MIN_ZOOM = 4;

const mapStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
} as const;

export const mapOptions = {
  exitFullscreenByEsc: true,
  minZoom: MIN_ZOOM,
  yandexMapAutoSwitch: true,
};
const accessToken = process.env.REACT_APP_YANDEX_MAPS_API_KEY || "";

const { mapStore } = globalStore;

function addBalloon(event: any) {
  const map = event.get("map");
  if (map.balloon.isOpen()) {
    map.balloon.close();
  } else {
    const coords = event.get("coords");
    map.balloon.open(coords, {
      contentHeader: `
          <a class="balloon__link" href=/event-creation?lat=${coords[0]}&long=${coords[1]}>
            Создать новое событие
          </a>`,
      contentBody:
        "<p>Координаты события: " +
        [coords[0].toPrecision(6), coords[1].toPrecision(6)].join(", ") +
        "</p>",
    });
  }
}

type Props = {
  className: string;
  onClick?: (center: [number, number], radius: number) => void;
};

const YaMap = observer(({ className, onClick }: Props) => {
  const [showEvents, setShowEvents] = useState(true);
  const onMapClick = async (event: any) => {
    addBalloon(event);
  };
  const currentMapState = {
    center: mapStore.coordinates,
    zoom: 10,
  };

  const onClickButton = () => {
    setShowEvents(!showEvents);
  };

  return (
    <YMaps
      className="yandex-maps"
      enterprise={true}
      query={{ apikey: accessToken }}
    >
      <Map
        style={mapStyle}
        state={currentMapState}
        className={className}
        options={mapOptions}
        onClick={onMapClick}
        onBoundsChange={(map: any) => {
          const [leftBound, rightBound] = map.get("newBounds");
          const newCenter = map.get("newCenter");
          const radius = getDistanceFromLatLonInKm(leftBound, rightBound);
          if (onClick) {
            onClick(newCenter, radius);
          }
        }}
        instanceRef={(map: any) => {
          if (map !== null) {
            map.behaviors.enable("scrollZoom");
            map.behaviors.disable("dblClickZoom");
            map.behaviors.disable("rightMouseButtonMagnifier");
          }
        }}
      >
        <SearchControl options={{ float: "right" }} />
        <ZoomControl
          options={{
            size: "large",
            position: { right: "25px", bottom: "50px" },
          }}
        />
        <Button
          options={{
            size: "large",
            maxWidth: 56,
            position: { right: "25px", bottom: "275px" },
          }}
          data={{
            content: showEvents
              ? ReactDOMServer.renderToString(
                  <BiShow className="yandex-maps__icon" />
                )
              : ReactDOMServer.renderToString(
                  <BiHide className="yandex-maps__icon" />
                ),
          }}
          defaultState={{ selected: true }}
          onClick={onClickButton}
        />
        <Clusterer>
          {showEvents && (
            <Circles events={globalStore.eventLocationStore.getAll()} />
          )}
        </Clusterer>
      </Map>
    </YMaps>
  );
});

export default YaMap;
