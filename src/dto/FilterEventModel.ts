import {DateFilterModel} from "./DateFilterModel";
import {OwnerFilterModel} from "./OwnerFilterModel";
import {LocationFilterModel} from "./LocationFilterModel";
import {TagsFilterModel} from "./TagsFilterModel";

export interface FilterEventModel {
    startDate: DateFilterModel | undefined
    endDate: DateFilterModel | undefined
    owner: OwnerFilterModel | undefined
    radiusLocation: LocationFilterModel | undefined
    tags: TagsFilterModel | undefined
}