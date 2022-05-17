import React, { useEffect } from "react";
import YandexMap from "./YandexMap/YaMap";
import SideBar from "./SideBar/SideBar";
import "./style.css";
import { useLocation } from "react-router-dom";
import { requestEvents } from "../../api/events/getEvents";
import globalStore from "../../stores/GlobalStore";

export default function Events() {
  useEffect(() => {
    if (query.toString() !== "") {
      requestEvents(query).then((r) =>
        globalStore.eventLocationStore.addRange(r.events)
      );
    }

    document.body.style.overflow = "hidden";
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    };
  });
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);

  return (
    <div className="main-page">
      <SideBar className="side-bar" />
      <YandexMap className="ya-map" />
    </div>
  );
}
