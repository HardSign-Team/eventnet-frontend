import { EventStore } from "./EventStore";
import MapStore from "./MapStore";
import { UserStore } from "./UserStore";

class GlobalStore {
  public readonly eventStore: EventStore = new EventStore();
  public readonly mapStore: MapStore = new MapStore();
  public readonly userStore: UserStore = new UserStore();
}

const globalStore = new GlobalStore();

export default globalStore;
