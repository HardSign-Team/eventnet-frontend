import { makeAutoObservable } from "mobx";

export default class MapStore {
  private _coordinates: [number, number] = [56.84168, 60.614947];

  constructor() {
    makeAutoObservable(this, {});
  }

  get coordinates() {
    return this._coordinates;
  }

  setCoordinates(coordinates: [number, number]) {
    this._coordinates = coordinates;
  }
}
