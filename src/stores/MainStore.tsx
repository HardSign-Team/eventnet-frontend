import { UserStore } from "./UserStore";
import { EventStore } from "./EventStore";

export class MainStore {
  public userStore = new UserStore();
  public eventStore = new EventStore();
}
