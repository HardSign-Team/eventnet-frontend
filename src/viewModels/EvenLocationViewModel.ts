import {LocationViewModel} from "./LocationViewModel";
import {guid} from "./Guid";
import {IEntityViewModel} from "../utils/IEntity";

export interface EventLocationViewModel extends IEntityViewModel<guid>{
    id: guid,
    location: LocationViewModel,
    name: string
}