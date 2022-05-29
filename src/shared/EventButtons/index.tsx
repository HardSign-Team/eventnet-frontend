import styles from "./index.module.scss";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import EventInfo from "../../models/EventInfo";
import { useEffect, useState } from "react";
import { addLike } from "../../api/marks/likes/addLike";
import globalStore from "../../stores/GlobalStore";
import { observer } from "mobx-react-lite";
import { deleteLike } from "../../api/marks/likes/deleteLike";
import { deleteDislike } from "../../api/marks/dislikes/deleteDislike";
import { addDislike } from "../../api/marks/dislikes/addDislike";
import { deleteSubscription } from "../../api/marks/subscriptions/deleteSubscription";
import { addSubscription } from "../../api/marks/subscriptions/addSubscription";

interface EventButtonsProps {
  eventId: string;
  eventInfo: EventInfo;
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
  width: "30px",
  height: "30px",
} as const;

const { userStore } = globalStore;

export const EventButtons: React.FC<EventButtonsProps> = observer(
  ({ eventId, eventInfo }) => {
    const [marks, setMarks] = useState({
      likes: eventInfo.likes,
      dislikes: eventInfo.dislikes,
    });
    const [subscriptions, setSubscriptions] = useState(eventInfo.participants);

    const [isLikeActive, setIsLikeActive] = useState(false);
    const [isDislikeActive, setIsDislikeActive] = useState(false);
    const [isSubscriptionActive, setiIsSubscriptionActive] = useState(false);

    useEffect(() => {
      isLikeActive && setIsDislikeActive(false);
    }, [isLikeActive]);

    useEffect(() => {
      isDislikeActive && setIsLikeActive(false);
    }, [isDislikeActive]);

    const onClick = async (action: ButtonActions) => {
      switch (action) {
        case ButtonActions.Like:
          let newLikes;
          if (isLikeActive) {
            newLikes = await deleteLike(eventId, userStore.getAccessToken());
          } else {
            newLikes = await addLike(eventId, userStore.getAccessToken());
          }
          setIsLikeActive((prev) => !prev);
          newLikes && setMarks(newLikes);
          break;
        case ButtonActions.Dislike:
          let newDislikes;
          if (isDislikeActive) {
            newDislikes = await deleteDislike(
              eventId,
              userStore.getAccessToken()
            );
          } else {
            newDislikes = await addDislike(eventId, userStore.getAccessToken());
          }
          setIsDislikeActive((prev) => !prev);
          newDislikes && setMarks(newDislikes);
          break;
        case ButtonActions.Subscribe:
          let newSubscriptions;
          if (isSubscriptionActive) {
            newSubscriptions = (
              await deleteSubscription(eventId, userStore.getAccessToken())
            ).count;
          } else {
            newSubscriptions = (
              await addSubscription(eventId, userStore.getAccessToken())
            ).count;
          }
          setiIsSubscriptionActive((prev) => !prev);
          newSubscriptions && setSubscriptions(newSubscriptions);
          break;
      }
    };

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
        >
          <GoLocation
            style={{
              ...iconsStyle,
              backgroundColor: isSubscriptionActive ? "#008D8E" : "#D7DCD7",
            }}
          />
          {subscriptions}
        </button>
      </div>
    );
  }
);
