import { guid } from "../viewModels/Guid";
import { Location } from "./Location";

export interface CreateEventModel {
  id: guid;
  startDate: Date;
  endDate?: Date;
  name: string;
  description?: string;
  location: Location;
  tags: string[];
  photos: Blob[];
}
