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
import { observer } from "mobx-react-lite";
import { throttle } from "lodash";
import { Coordinates } from "../../models/Coordinates";

const Events = observer(() => {
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.toString() !== "") {
      requestEvents(query)
        .then((r) => {
          globalStore.eventLocationStore.addRange(r.events);
        })
        .catch((e: any) => console.log(e.message));
    }
    document.body.style.overflow = "hidden";
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    };
  }, [query]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const onChangeBound = throttle((center: Coordinates, radius: number) => {
    const dto = new RequestEventDto(
      {
        radiusLocation: new LocationFilterModel(
          new Location(center[0], center[1]),
          radius
        ),
      },
      new PageInfoDto(1, 5)
    );
    const params = buildRequestEventsParams(dto);
    navigate(`/events?${params}`);
  }, 500);

  return (
    <div className="main-page">
      <SideBar className="side-bar" onSubmit={handleSubmit} />
      <YandexMap className="ya-map" onChangeBound={onChangeBound} />
    </div>
  );
});

export default Events;
