import {LocationViewModel} from "./LocationViewModel";
import {guid} from "./Guid";

export interface EventLocationViewModel {
    id: guid,
    location: LocationViewModel,
    name: string
}