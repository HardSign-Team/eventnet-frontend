import { makeAutoObservable } from "mobx";
import { Coordinates } from "../models/Coordinates";

export default class MapStore {
  private _coordinates: Coordinates = [56.84168, 60.614947];

  constructor() {
    makeAutoObservable(this, {});
  }

  public get coordinates(): Coordinates {
    return this._coordinates;
  }

  public set coordinates(coords: Coordinates) {
    this._coordinates = coords;
  }
}
