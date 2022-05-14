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

const MIN_ZOOM = 4;
const accessToken = process.env.REACT_APP_YANDEX_MAPS_API_KEY || "";

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

  const onClickButton = (event: any) => {
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
