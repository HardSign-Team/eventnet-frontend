import { guid } from "../viewModels/Guid";
import { Location } from "./Location";
import Image from '../models/Image';

export interface CreateEventModel {
  id: guid;
  startDate: Date;
  endDate?: Date;
  name: string;
  description: string;
  location: Location;
  tags: string[];
  photos: Image[];
}
