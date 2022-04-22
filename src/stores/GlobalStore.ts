import { EventStore } from "./EventStore";
import MapStore from "./MapStore";

class GlobalStore {
  private readonly _eventStore: EventStore;
  private readonly _mapStore: MapStore;

  constructor() {
    this._eventStore = new EventStore();
    this._mapStore = new MapStore();
  }

  get eventStore(): EventStore {
    return this._eventStore;
  }

  get mapStore(): MapStore {
    return this._mapStore;
  }
}

const globalStore = new GlobalStore();

export default globalStore;
