import React, { useEffect } from "react";
import YaMap from "./YandexMap/YaMap";
import SideBar from "./SideBar/SideBar";
import "./Main.css";

export default function Main() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    };
  });
  return (
    <div className="main-page">
      <SideBar className="side-bar" />
      <YaMap className="ya-map" />
    </div>
  );
}
