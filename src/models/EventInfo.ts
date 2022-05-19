import Image from "./Image";

export default interface EventInfo {
  dateStart: Date;
  name: string;
  coordinates: [number, number];
  dateEnd?: Date;
  description?: string;
  likes?: number;
  dislikes?: number;
  participants?: number;
  photos?: Array<Image>;
}
