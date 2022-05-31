import { int } from "./Int";
import { guid } from "./Guid";

export interface SubscriptionsCountViewModel {
  eventId: guid;
  count: int;
}
