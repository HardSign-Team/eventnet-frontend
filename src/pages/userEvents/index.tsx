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
import { getMySubscriptions } from "../../api/marks/my/getMySubscriptions";
import {
  requestEventsFullInfo,
} from "../../api/events/getEvents";

export enum UserEventsTypes {
  Own,
  Subscribed,
}

type UserEventsProps = {
  type: UserEventsTypes;
};

enum SelectorItem {
  Relevant = "Актуальные",
  Past = "Прошедшие",
}

const { userStore } = globalStore;

export const UserEvents: React.FC<UserEventsProps> = observer(({ type }) => {
  const [events, setEvents] = useState<Event[]>([]);

  const [picked, setPicked] = useState(SelectorItem.Relevant);

  useEffect(() => {
    type === UserEventsTypes.Own && loadMyEvents().then((r) => r);
    type === UserEventsTypes.Subscribed &&
      loadSubscribedEvents().then((r) => r);
  }, [type]);

  const loadMyEvents = async () => {
    const response = await requestMyEvents(userStore.getAccessToken());
    const myEvents = response.events.map((x) => eventViewModelToEvent(x));
    setEvents(myEvents);
  };

  const loadSubscribedEvents = async () => {
    const eventsIdsResponse = await getMySubscriptions(
      userStore.getAccessToken()
    );
    const subscribedEventsResponse = await requestEventsFullInfo({
      ids: eventsIdsResponse.eventIds,
    });
    const subscribedEvents = subscribedEventsResponse.events
      .map((x) => eventViewModelToEvent(x))
      .filter((x) => isEventRelevant(x.info));
    setEvents(subscribedEvents);
  };

  return (
    <section className={styles.userEvents}>
      <h2 className={styles.userEvents__userName}>
        {(type === UserEventsTypes.Own
          ? `События пользователя `
          : type === UserEventsTypes.Subscribed
          ? "Подписки пользователя "
          : "Ошибка, пожалуйста обновите страницу ") +
          `${userStore.getUserName()}`}
      </h2>
      {type === UserEventsTypes.Own && (
        <CustomSelector
          onChange={setPicked}
          first={SelectorItem.Relevant}
          second={SelectorItem.Past}
          firstLabel={SelectorItem.Relevant}
          secondLabel={SelectorItem.Past}
          value={picked}
        />
      )}
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
