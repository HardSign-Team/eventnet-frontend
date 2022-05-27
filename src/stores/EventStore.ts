import Event from "../models/Event";
import { makeAutoObservable } from "mobx";
import { guid } from "../viewModels/Guid";
import { requestEventsFullInfo } from "../api/events/getEvents";
import { EventIdsModel } from "../dto/EventIdsModel";
import { EventViewModel } from "../viewModels/EventViewModel";
import { eventViewModelToEvent } from "../utils/convertHelper";

export class EventStore {
  private events: Array<Event> = [];
  private allowAdding = true;

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

  setEvents(eventsIds: Array<guid>) {
    EventStore.getFullInfo(eventsIds).then((ev) => {
      this.events = ev.map(eventViewModelToEvent);
    });
  }

  addEvents(eventsIds: Array<guid>) {
    EventStore.getFullInfo(eventsIds).then((ev) => {
      ev.forEach((evm) => {
        const event = eventViewModelToEvent(evm);
        if (!this._has(event)) this.events.push(event);
      });
    });
  }

  private static async getFullInfo(
    eventsIds: Array<guid>
  ): Promise<EventViewModel[]> {
    const eventsModel = new EventIdsModel(eventsIds);
    const { events } = await requestEventsFullInfo(eventsModel);
    return events;
  }
}
