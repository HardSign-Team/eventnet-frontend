import React, { useState } from "react";
import YaMap from "./YandexMap/YaMap";
import SideBar from "./SideBar/SideBar";

export default function Main() {
  return (
    <div className="main-page">
      <SideBar className="slide-bar" />
      <YaMap className="ya-map" />
    </div>
  );
}
