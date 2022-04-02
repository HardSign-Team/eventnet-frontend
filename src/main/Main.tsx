import React from "react";
import YaMap from "./YaMap";
import SideBar from "./SideBar";

export default function Main() {
  return (
    <div className="main-page">
      <SideBar className="slide-bar" width={"20%"} />
      <YaMap className="ya-map" />
    </div>
  );
}
