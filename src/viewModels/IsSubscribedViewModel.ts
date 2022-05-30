import { guid } from "./Guid";

export interface IsSubscribedViewModel {
  eventId: guid;
  isSubscribed: boolean;
}
