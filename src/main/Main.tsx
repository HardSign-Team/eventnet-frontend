import React, { useEffect } from "react";
import YaMap from "./YandexMap/YaMap";
import SideBar from "./SideBar/SideBar";
import {buildRequestEventsParams, requestEvents} from "../api/events/getEvents";
import { RequestEventDto } from "../dto/RequestEventDto";
import { LocationFilterModel } from "../dto/LocationFilterModel";
import { Location } from "../dto/Location";
import { PageInfo } from "../dto/PageInfo";
import { useLocation, useNavigate } from "react-router-dom";
import globalStore from "../stores/GlobalStore";
import {requestEvent} from "../api/events/getEvent";

export default function Main() {
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);
  useEffect(() => {
    if (query.toString() !== "") {
        requestEvents(query)
            .then((r) => {
                globalStore.eventStore.addEvents(r.events)
            })
            .catch((e: any) => console.log(e.message))
    }
  });
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await request();
  };

  const handleClick = async () => {
      // await request();
      requestEvent("1D84109D-157E-4CAC-B989-5C23ABD0212D").then(r => console.log(r.event));
  };

  const request = async () => {
      const dto = new RequestEventDto(
          {
              radiusLocation: new LocationFilterModel(new Location(Math.random(), 0.6231),10),
          },
          new PageInfo(1, 10)
      );
      const params = buildRequestEventsParams(dto);
      navigate(`/events?${params}`);
  }

  return (
    <div className="main-page">
      <SideBar className="slide-bar" onSubmit={handleSubmit} />
      <YaMap className="ya-map" onClick={handleClick} />
    </div>
  );
}
