import styles from "./index.module.scss";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import Event from "../../models/Event";
import { useEffect, useState } from "react";
import { addLike } from "../../api/marks/likes/addLike";
import globalStore from "../../stores/GlobalStore";
import { observer } from "mobx-react-lite";
import { deleteLike } from "../../api/marks/likes/deleteLike";
import { deleteDislike } from "../../api/marks/dislikes/deleteDislike";
import { addDislike } from "../../api/marks/dislikes/addDislike";
import { deleteSubscription } from "../../api/marks/subscriptions/deleteSubscription";
import { addSubscription } from "../../api/marks/subscriptions/addSubscription";
import { getMyMarks } from "../../api/marks/my/getMyMarks";
import { MarksCountViewModel } from "../../viewModels/MarksCountViewModel";
import { getIsSubscribed } from "../../api/marks/my/getIsSubscribed";
import { isEventRelevant } from "../../utils/eventsHelper";

interface EventButtonsProps {
  event: Event;
}

enum ButtonActions {
  Like,
  Dislike,
  Subscribe,
}

const iconsStyle = {
  float: "right",
  borderRadius: "50%",
  backgroundColor: "#D7DCD7",
  display: "inline-block",
  width: "28px",
  height: "28px",
  padding: "2px",
} as const;

const { userStore, eventStore } = globalStore;

export const EventButtons: React.FC<EventButtonsProps> = observer(
  ({ event }) => {
    const [marks, setMarks] = useState({
      likes: event.info.likes,
      dislikes: event.info.dislikes,
    });
    const [subscriptions, setSubscriptions] = useState(event.info.participants);

    const [isLikeActive, setIsLikeActive] = useState(false);
    const [isDislikeActive, setIsDislikeActive] = useState(false);
    const [isSubscriptionActive, setIsSubscriptionActive] = useState(false);

    useEffect(() => {
      getMyMarks(event.id, userStore.getAccessToken()).then(
        (userMarks: MarksCountViewModel) => {
          if (!userMarks) return;
          setMarks({ likes: event.info.likes, dislikes: event.info.dislikes });
          setIsLikeActive(userMarks.likes > 0);
          setIsDislikeActive(userMarks.dislikes > 0);
        }
      );
      getIsSubscribed(event.id, userStore.getAccessToken()).then((resp) => {
        resp.isSubscribed
          ? setIsSubscriptionActive(true)
          : setIsSubscriptionActive(false);
        setSubscriptions(event.info.participants);
      });
    }, [event]);

    useEffect(() => {
      isLikeActive && setIsDislikeActive(false);
    }, [isLikeActive]);

    useEffect(() => {
      isDislikeActive && setIsLikeActive(false);
    }, [isDislikeActive]);

    const handleAction = async (
      addCallback: (eventId: string, token: string) => Promise<any>,
      deleteCallback: (eventId: string, token: string) => Promise<any>,
      setNewValue: (value: React.SetStateAction<any>) => void,
      isActive: boolean,
      setIsActive: (value: React.SetStateAction<boolean>) => void
    ) => {
      let newValue;

      if (isActive) {
        newValue = await deleteCallback(event.id, userStore.getAccessToken());
      } else {
        newValue = await addCallback(event.id, userStore.getAccessToken());
      }

      if (newValue) {
        setIsActive((prev) => !prev);
        setNewValue(newValue.count ?? newValue);
        eventStore.updateEventById(event.id);
      }
    };

    const onClick = async (action: ButtonActions) => {
      switch (action) {
        case ButtonActions.Like:
          await handleAction(
            addLike,
            deleteLike,
            setMarks,
            isLikeActive,
            setIsLikeActive
          );
          break;
        case ButtonActions.Dislike:
          await handleAction(
            addDislike,
            deleteDislike,
            setMarks,
            isDislikeActive,
            setIsDislikeActive
          );
          break;
        case ButtonActions.Subscribe:
          await handleAction(
            addSubscription,
            deleteSubscription,
            setSubscriptions,
            isSubscriptionActive,
            setIsSubscriptionActive
          );
          break;
      }
    };

    const isSubscriptionDisabled = !isEventRelevant(event.info);

    return (
      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={() => onClick(ButtonActions.Like)}
        >
          <AiOutlineLike
            style={{
              ...iconsStyle,
              backgroundColor: isLikeActive ? "#008D8E" : "#D7DCD7",
            }}
          />
          {marks.likes}
        </button>
        <button
          className={styles.button}
          onClick={() => onClick(ButtonActions.Dislike)}
        >
          <AiOutlineDislike
            style={{
              ...iconsStyle,
              backgroundColor: isDislikeActive ? "#008D8E" : "#D7DCD7",
            }}
          />
          {marks.dislikes}
        </button>
        <button
          className={styles.button}
          onClick={() => onClick(ButtonActions.Subscribe)}
          disabled={isSubscriptionDisabled}
        >
          <GoLocation
            style={{
              ...iconsStyle,
              backgroundColor: isSubscriptionActive ? "#008D8E" : "#D7DCD7",
              opacity: isSubscriptionDisabled ? "35%" : "100%",
            }}
          />
          {subscriptions}
        </button>
      </div>
    );
  }
);
