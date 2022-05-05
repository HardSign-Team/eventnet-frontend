import React, { useState } from "react";
import styles from "./index.module.scss";
import { CustomSelector } from "../shared/CustomSelector/CustomSelector";
import EventCard from "../main/EventCard/EventCard";
import globalStore from "../stores/GlobalStore";
import { observer } from "mobx-react-lite";
import Event from "../models/Event";

type UserEventsProps = {};

enum SelectorItem {
  Relevant = "Актуальные",
  Past = "Прошедшие",
}

const { eventStore } = globalStore;

const USERNAME = "lapakota";

export const UserEvents: React.FC<UserEventsProps> = observer(() => {
  const [picked, setPicked] = useState(SelectorItem.Relevant);

  const isRelevant = (event: Event) => {
    if (!event.info.dateEnd) return true;

    return event.info.dateEnd?.getTime() - new Date().getTime() > 0;
  };

  return (
    <section className={styles.userEvents}>
      <h2 className={styles.userEvents__userName}>
        События от пользователя {USERNAME}
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
        {eventStore.events
          .filter((x) =>
            picked === SelectorItem.Relevant ? isRelevant(x) : !isRelevant(x)
          )
          .map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
      </div>
    </section>
  );
});
