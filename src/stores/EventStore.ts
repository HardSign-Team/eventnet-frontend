import { makeAutoObservable } from "mobx";
import Event from "../models/Event";
import EventInfo from "../models/EventInfo";

export class EventStore {
  public events: Array<Event> = [];
  private mockedId: number = 1;

  constructor() {
    makeAutoObservable(this);
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

  public deleteEvent(event: Event) {
    this.events = this.events.filter((ev) => ev.id === event.id);
  }
}
