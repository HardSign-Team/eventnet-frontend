import React, { useEffect } from "react";
import YandexMap from "./YandexMap/YaMap";
import SideBar from "./SideBar/SideBar";
import "./style.css";

export default function Events() {
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
      <YandexMap className="ya-map" />
    </div>
  );
}
