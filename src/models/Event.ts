import EventInfo from "./EventInfo";
import { guid } from "../viewModels/Guid";

export default interface Event {
  id: guid;
  info: EventInfo;
}
