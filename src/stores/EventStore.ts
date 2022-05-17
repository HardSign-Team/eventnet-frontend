import Event from "../models/Event";
import EventInfo from "../models/EventInfo";
import { EventLocationViewModel } from "../viewModels/EvenLocationViewModel";
import { makeAutoObservable } from "mobx";

export class EventStore {
  public events: Array<Event> = [];

  private mockedId: number = 1;

  constructor() {
    makeAutoObservable(this, {});
  }

  public createEvent(eventInfo: EventInfo): number {
    const newEvent: Event = {
      id: this.mockedId++,
      info: eventInfo,
    };
    this.events.push(newEvent);
    return this.mockedId;
  }

  public getEvents(): Array<Event> {
    return this.events;
  }

  public getEventById(id: number): Event | undefined {
    return this.events.find((event) => event.id === id);
  }

  public deleteEvent(event: Event) {
    this.events = this.events.filter((ev) => ev.id === event.id);
  }

  addEvents(events: Array<EventLocationViewModel>) {
    // TODO заглушка
    const a = events.map((e) => {
      return {
        id: Math.floor(Math.random() * 10000),
        info: {
          name: e.name,
          coordinates: [e.location.latitude, e.location.longitude],
          dateStart: new Date(2021, 10, 15),
          likes: 2,
          description: "",
          dateEnd: new Date(2021, 10, 15),
          photos: [
            {
              url: "https://cdn.iz.ru/sites/default/files/styles/1920x1080/public/article-2019-06/ZURR4215.JPG.jpg?itok=2KMsqbt9",
            },
          ],
        },
      };
    });
    for (const e of a) {
      this.events.push(e as Event);
    }
    console.log(this.events);
  }
}
