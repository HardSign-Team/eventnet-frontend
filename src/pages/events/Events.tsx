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
import EventBalloonContent from "./YandexMap/EventBalloonContent/EventBalloonContent";
import Event from "../../models/Event";

const requestEventsFromApi = (query: URLSearchParams) => {
  if (query.toString() !== "") {
    requestEvents(query)
      .then((r) => {
        globalStore.eventLocationStore.setRange(r.events);
        globalStore.eventStore.setEvents(r.events.map((event) => event.id));
      })
      .catch(console.error);
  }
};

type LocationInfo = {
  center: Coordinates;
  radius: number;
};

const METERS_PER_KILOMETER = 1000;
const DEFAULT_PAGE_SIZE = 1000;
const DEFAULT_REQUEST_INTERVAL = 50000;

const Events = observer(() => {
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);
  const navigate = useNavigate();
  const [locationInfo, setLocationInfo] = useState<LocationInfo>();
  const [tags, setTags] = useState<TagNameViewModel[]>([]);

  const throttled = useRef(
    throttle((locationInfo, tags: TagNameViewModel[]) => {
      if (!locationInfo) return;
      let tagFilter;
      if (tags.length !== 0) {
        tagFilter = new TagsFilterModel(tags.map((t) => t.id));
      }
      const dto = new RequestEventDto(
        {
          radiusLocation: new LocationFilterModel(
            coordinatesToLocation(locationInfo.center),
            locationInfo.radius * METERS_PER_KILOMETER
          ),
          tags: tagFilter,
        },
        new PageInfoDto(1, DEFAULT_PAGE_SIZE)
      );
      const params = buildRequestEventsParams(dto);
      navigate(`/events?${params}`);
    }, 500)
  );

  useInterval(() => {
    requestEventsFromApi(query);
  }, DEFAULT_REQUEST_INTERVAL);

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
      <div className={"popup-modal-window"}>
        <EventBalloonContent
          className={"event-balloon-content"}
          event={globalStore.eventStore.getBalloonEvent()}
        />
      </div>
    </div>
  );
});

export default Events;
