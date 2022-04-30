import React from "react";
import YaMap from "./YandexMap/YaMap";
import SideBar from "./SideBar/SideBar";
import "./Main.css";

export default function Main() {
  return (
    <div className="main-page">
      <SideBar className="side-bar" />
      <YaMap className="ya-map" />
    </div>
  );
}
