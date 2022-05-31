import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { CustomSelector } from "../../shared/CustomSelector/CustomSelector";
import EventCard from "../events/EventCard/EventCard";
import globalStore from "../../stores/GlobalStore";
import { observer } from "mobx-react-lite";
import Event from "../../models/Event";
import { requestMyEvents } from "../../api/events/getMyEvents";
import { eventViewModelToEvent } from "../../utils/convertHelper";
import { isEventRelevant } from "../../utils/eventsHelper";

type UserEventsProps = {};

enum SelectorItem {
  Relevant = "Актуальные",
  Past = "Прошедшие",
}

const { userStore } = globalStore;

export const UserEvents: React.FC<UserEventsProps> = observer(() => {
  const [events, setEvents] = useState<Event[]>([]);

  const [picked, setPicked] = useState(SelectorItem.Relevant);

  useEffect(() => {
    loadMyEvents().then((r) => r);
  }, []);

  const loadMyEvents = async () => {
    const response = await requestMyEvents(userStore.getAccessToken());
    const myEvents = response.events.map((x) => eventViewModelToEvent(x));
    setEvents(myEvents);
  };

  return (
    <section className={styles.userEvents}>
      <h2 className={styles.userEvents__userName}>
        События от пользователя {userStore.getUserName()}
      </h2>
      <CustomSelector
        onChange={setPicked}
        first={SelectorItem.Relevant}
        second={SelectorItem.Past}
        firstLabel={SelectorItem.Relevant}
        secondLabel={SelectorItem.Past}
        value={picked}
      />
      <div className={styles.userEvents__events}>
        {events
          .filter((event) =>
            picked === SelectorItem.Relevant
              ? isEventRelevant(event.info)
              : !isEventRelevant(event.info)
          )
          .map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
      </div>
    </section>
  );
});
