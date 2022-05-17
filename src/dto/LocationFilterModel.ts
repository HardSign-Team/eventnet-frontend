import {Location} from "./Location";

export class LocationFilterModel {
    public constructor(readonly location: Location, readonly radius: Number) {
    }
}