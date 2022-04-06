export default interface EventInfo {
  dateStart: Date;
  name: string;
  coordinates: [number, number];
  dateEnd?: Date;
  description?: string;
  likes?: number;
  photos?: Array<ArrayBuffer>;
}
