import { makeAutoObservable } from "mobx";

export default class MapStore {
  public coordinates = [56.84168, 60.614947];

  constructor() {
    makeAutoObservable(this, {});
  }
}
