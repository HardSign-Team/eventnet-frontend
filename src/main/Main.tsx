import React, { useState } from "react";
import YaMap from "./YandexMap/YaMap";
import SideBar from "./SideBar/SideBar";
import { MapContext } from "../contexts/MapContext";

export default function Main() {
  const [coordinates, setCoordinates] = useState<[number, number]>([
    56.817076, 60.611855,
  ]);

  return (
    <MapContext.Provider value={{ coordinates, setCoordinates }}>
      <div className="main-page">
        <SideBar className="slide-bar" />
        <YaMap className="ya-map" />
      </div>
    </MapContext.Provider>
  );
}
