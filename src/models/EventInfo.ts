import Image from "./Image";
import { Coordinates } from "./Coordinates";

export default interface EventInfo {
  dateStart: Date;
  name: string;
  coordinates: Coordinates;
  dateEnd?: Date;
  description?: string;
  likes?: number;
  dislikes?: number;
  participants?: number;
  photos?: Array<Image>;
}
