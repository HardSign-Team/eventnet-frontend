interface IEventInformation {
    setName(name: string): undefined | EventInformation;
    setDateOfBeginning(date: Date): undefined | EventInformation;
    setDateOfEnding(date: Date): undefined | EventInformation;
    setDescription(description: string): undefined | EventInformation;
    setLikes(number: number): undefined | EventInformation;
    addLike(): undefined | EventInformation;
    setPhotos(...photos: Array<ArrayBuffer>): undefined | EventInformation;

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

    getAllInfo(){
        return {
            dateOfBeginning: this.dateOfBeginning,
            name: this.name,
            dateOfEnding: this.dateOfEnding,
            description: this.description,
            likes: this.likes,
            photos: this.photos,
        }
    }

    addLike(): undefined | EventInformation {
        if (this.likes) this.likes++;
        return this;
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

    setDateOfBeginning(date: Date): undefined | EventInformation {
        this.dateOfBeginning = date;
        return this;
    }

    setDateOfEnding(date: Date): undefined | EventInformation {
        this.dateOfEnding = date;
        return this;
    }

    setDescription(description: string): undefined | EventInformation {
        this.description = description;
        return this;
    }

    setLikes(number: number): undefined | EventInformation {
        this.likes = number;
        return this;
    }

    setName(name: string): undefined | EventInformation {
        this.name = name;
        return this;
    }

    setPhotos(...photos: Array<ArrayBuffer>): undefined | EventInformation {
        if (this.photos) this.photos = [...this.photos, ...photos];
        else this.photos = [...photos];
        return this;
    }
}
