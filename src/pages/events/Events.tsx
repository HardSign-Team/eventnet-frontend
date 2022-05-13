import React, { useEffect } from "react";
import YandexMap from "./YandexMap/YaMap";
import SideBar from "./SideBar/SideBar";
import "./style.css";
import { RequestEventDto } from "../../dto/RequestEventDto";
import { LocationFilterModel } from "../../dto/LocationFilterModel";
import {
  buildRequestEventsParams,
  requestEvents,
} from "../../api/events/getEvents";
import globalStore from "../../stores/GlobalStore";
import { useLocation, useNavigate } from "react-router-dom";
import { Location } from "../../dto/Location";
import { PageInfoDto } from "../../dto/PageInfoDto";

export default function Events() {
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.toString() !== "") {
      requestEvents(query)
        .then((r) => {
          globalStore.eventStore.addEvents(r.events);
        })
        .catch((e: any) => console.log(e.message));
    }
    document.body.style.overflow = "hidden";
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    };
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await request();
  };

  const handleClick = async () => {
    await request();
  };

  const request = async () => {
    const dto = new RequestEventDto(
      {
        radiusLocation: new LocationFilterModel(
          new Location(Math.random(), 0.6231),
          10
        ),
      },
      new PageInfoDto(1, 10)
    );
    const params = buildRequestEventsParams(dto);
    navigate(`/events?${params}`);
  };
  return (
    <div className="main-page">
      <SideBar className="side-bar" onSubmit={handleSubmit} />
      <YandexMap className="ya-map" onClick={handleClick} />
    </div>
  );
}
