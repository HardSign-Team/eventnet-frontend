import Image from "./Image";
import { Coordinates } from "./Coordinates";
import { guid } from "../viewModels/Guid";
import { TagNameViewModel } from "../viewModels/TagNameViewModel";

export default interface EventInfo {
  ownerId: guid;
  dateStart: Date;
  name: string;
  coordinates: Coordinates;
  dateEnd: Date | null;
  description: string;
  likes: number;
  dislikes: number;
  participants: number;
  photos?: Array<Image>;
  tags: TagNameViewModel[];
}
