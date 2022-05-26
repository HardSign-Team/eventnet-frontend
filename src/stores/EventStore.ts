import Event from "../models/Event";
import EventInfo from "../models/EventInfo";
import { EventLocationViewModel } from "../viewModels/EvenLocationViewModel";
import { makeAutoObservable } from "mobx";
import { guid } from "../viewModels/Guid";
import { requestEventsFullInfo } from "../api/events/getEvents";
import { evmToEvent } from "../pages/events/YandexMap/Circles/Circles";
import { EventIdsModel } from "../dto/EventIdsModel";

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

  _has(event: Event) {
    return this.events.some((e) => e.id === event.id);
  }

  addEvent(event: Event) {
    if (!this._has(event)) this.events.push(event);
  }

  addEvents(eventsIds: Array<guid>) {
    const eventsModel = new EventIdsModel(eventsIds);
    console.log(eventsIds);
    requestEventsFullInfo(eventsModel)
      .then((_) => _.events)
      .then((ev) => {
        console.log(ev);
        ev.forEach((event) => {
          this.events.push(evmToEvent(event));
        });
      });
  }
}
