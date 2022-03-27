export type EventType = {
    id: number,
    dateOfBeginning: Date;
    name: string;
    coordinates: [number, number];
    dateOfEnding?: Date;
    description?: string;
    likes?: number;
    photos?: Array<ArrayBuffer>;
}