import Event from "../models/Event";
import EventInfo from "../models/EventInfo";
import { EventLocationViewModel } from "../viewModels/EvenLocationViewModel";
import { makeAutoObservable } from "mobx";
import { guid } from "../viewModels/Guid";

export class EventStore {
  public events: Array<Event> = [];

  constructor() {
    makeAutoObservable(this, {});
  }

  public getEvents(): Array<Event> {
    return this.events;
  }

  public getEventById(id: guid): Event | undefined {
    return this.events.find((event) => event.id === id);
  }

  public deleteEvent(event: Event) {
    this.events = this.events.filter((ev) => ev.id === event.id);
  }

  addEvents(events: Array<EventLocationViewModel>) {
    const a: Array<Event> = events.map((event) => {
      return {
        id: event.id,
        info: {
          name: event.name,
          coordinates: [event.location.latitude, event.location.longitude],
          dateStart: new Date(2021, 10, 15),
          likes: 2,
          description: "",
          dateEnd: new Date(2021, 10, 15),
        },
      };
    });
    for (const e of a) {
      if (!this.events.some((event) => event.id === e.id)) this.events.push(e);
    }
  }
}
