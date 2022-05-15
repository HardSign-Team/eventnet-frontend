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
import { Link } from "react-router-dom";

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
const accessToken = process.env.REACT_APP_YANDEX_MAPS_API_KEY || "";
const { eventStore, mapStore } = globalStore;

type Props = { className: string; onClick?: () => void };
const YaMap = observer(({ className, onClick }: Props) => {
  const [showEvents, setShowEvents] = useState(true);
  const currentMapState = {
    center: mapStore.coordinates,
    zoom: 10,
  };
  //
  // const closeCurrentBalloon = () => {
  //   const close: any = document.querySelector(
  //     'ymaps[class$="-balloon__close-button"]'
  //   );
  //   if (close != null) {
  //     close.click();
  //   }
  // };

  const onMapClick = async (event: any) => {
    const map = event.get("map");
    if (map.balloon.isOpen()) map.balloon.close();
    else {
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
    onClick?.();
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
          {showEvents && <Circles events={eventStore.events} />}
        </Clusterer>
      </Map>
    </YMaps>
  );
});

export default YaMap;
