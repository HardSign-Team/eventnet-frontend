import {guid} from "./Guid";
import {LocationViewModel} from "./LocationViewModel";
import {MarksCountViewModel} from "./MarksCountViewModel";
import {TagNameViewModel} from "./TagNameViewModel";

export interface EventViewModel {
    id: guid;
    ownerId: string;
    name: string;
    description: string;
    location: LocationViewModel;
    startDate: string;
    endDate: string | null;
    tags: TagNameViewModel[],
    totalSubscriptions: number,
    marks: MarksCountViewModel
}