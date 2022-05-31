import React, { useEffect, useRef, useState } from "react";
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
import { PageInfoDto } from "../../dto/PageInfoDto";
import { observer } from "mobx-react-lite";
import { throttle } from "lodash";
import { Coordinates } from "../../models/Coordinates";
import { useInterval } from "../../utils/Hooks";
import { coordinatesToLocation } from "../../utils/convertHelper";
import { TagNameViewModel } from "../../viewModels/TagNameViewModel";
import { TagsFilterModel } from "../../dto/TagsFilterModel";

const requestEventsFromApi = (query: URLSearchParams) => {
  if (query.toString() !== "") {
    requestEvents(query)
      .then((r) => {
        globalStore.eventLocationStore.addRange(r.events);
      })
      .catch(console.error);
  }
};

type LocationInfo = {
  center: Coordinates;
  radius: number;
};

const Events = observer(() => {
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);
  const navigate = useNavigate();
  const [locationInfo, setLocationInfo] = useState<LocationInfo>();
  const [tags, setTags] = useState<TagNameViewModel[]>([]);
  const throttled = useRef(
    throttle((locationInfo, tags: TagNameViewModel[]) => {
      if (!locationInfo) return;
      const dto = new RequestEventDto(
        {
          radiusLocation: new LocationFilterModel(
            coordinatesToLocation(locationInfo.center),
            locationInfo.radius
          ),
          tags: new TagsFilterModel(tags.map((t) => t.id)),
        },
        new PageInfoDto(1, 100)
      );
      const params = buildRequestEventsParams(dto);
      navigate(`/events?${params}`);
    }, 500)
  );

  useInterval(() => {
    requestEventsFromApi(query);
  }, 5000);

  useEffect(() => {
    requestEventsFromApi(query);
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

  useEffect(() => {
    throttled.current(locationInfo, tags);
  }, [locationInfo, tags]);

  const onChangeBound = (center: Coordinates, radius: number) => {
    setLocationInfo({ center, radius });
  };

  return (
    <div className="main-page">
      <SideBar
        className="side-bar"
        onSubmit={handleSubmit}
        onInputTag={(tags) => setTags(tags)}
      />
      <YandexMap className="ya-map" onChangeBound={onChangeBound} />
      <div className={"popup-modal-window"} />
    </div>
  );
});

export default Events;
