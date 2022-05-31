import { DateFilterModel } from "./DateFilterModel";
import { OwnerFilterModel } from "./OwnerFilterModel";
import { LocationFilterModel } from "./LocationFilterModel";
import { TagsFilterModel } from "./TagsFilterModel";

export interface FilterEventModel {
  startDate?: DateFilterModel;
  endDate?: DateFilterModel;
  owner?: OwnerFilterModel;
  radiusLocation?: LocationFilterModel;
  tags?: TagsFilterModel;
}
