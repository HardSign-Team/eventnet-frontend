interface IEventInformation {
    setName(name: string): void;
    setDateOfBeginning(date: Date): void;
    setDateOfEnding(date: Date): void;
    setDescription(description: string): void;
    setLikes(number: number): void;
    addLike(): void;
    setPhotos(...photos: Array<ArrayBuffer>): void;

    getName(): string;
    getDateOfBeginning(): Date;
    getDateOfEnding(): Date | undefined;
    getDescription(): string | undefined;
    getLikes(): number | undefined;
    getPhotos(): Array<ArrayBuffer> | undefined;
}

export default class EventInformation implements IEventInformation {
    private dateOfBeginning: Date;
    private name: string;
    private dateOfEnding?: Date;
    private description?: string;
    private likes?: number;
    private photos?: Array<ArrayBuffer>;

    constructor(name: string, dateOfBeginning: Date) {
        this.dateOfBeginning = dateOfBeginning;
        this.name = name || '';
    }

    addLike(): void {
        if (this.likes) this.likes++;
    }

    getDateOfBeginning(): Date {
        return this.dateOfBeginning;
    }

    getDateOfEnding(): Date | undefined {
        if (this.dateOfEnding) return this.dateOfEnding;
    }

    getDescription(): string | undefined {
        if (this.description) return this.description;
    }

    getLikes(): number | undefined {
        return this.likes;
    }

    getName(): string {
        return this.name;
    }

    getPhotos(): Array<ArrayBuffer> | undefined {
        return this.photos;
    }

    setDateOfBeginning(date: Date): void {
        this.dateOfBeginning = date;
    }

    setDateOfEnding(date: Date): void {
        this.dateOfEnding = date;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setLikes(number: number): void {
        this.likes = number;
    }

    setName(name: string): void {
        this.name = name;
    }

    setPhotos(...photos: Array<ArrayBuffer>): void {
        if (this.photos) this.photos = [...this.photos, ...photos];
        else this.photos = [...photos];
    }
}
