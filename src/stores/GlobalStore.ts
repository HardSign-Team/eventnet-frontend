import { EventStore } from "./EventStore";
import MapStore from "./MapStore";
import { UserStore } from "./UserStore";
import {EventLocationStore} from "./EventLocationStore";

class GlobalStore {
  public readonly eventStore: EventStore = new EventStore();
  public readonly mapStore: MapStore = new MapStore();
  public readonly userStore: UserStore = new UserStore();
  public readonly eventLocationStore: EventLocationStore = new EventLocationStore();
}

const globalStore = new GlobalStore();

export default globalStore;
