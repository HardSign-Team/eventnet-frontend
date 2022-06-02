import Event from "../models/Event";
import { makeAutoObservable } from "mobx";
import { guid } from "../viewModels/Guid";
import { requestEventsFullInfo } from "../api/events/getEvents";
import { EventIdsModel } from "../dto/EventIdsModel";
import { EventViewModel } from "../viewModels/EventViewModel";
import {
  eventToEventLocationViewModel,
  eventViewModelToEvent,
} from "../utils/convertHelper";
import globalStore from "./GlobalStore";
import { requestEvent } from "../api/events/getEvent";

export class EventStore {
  private events: Array<Event> = [];
  private balloonEvent: Event | null = null;

  constructor() {
    makeAutoObservable(this, {});
  }

  public getEvents(): Array<Event> {
    return this.events;
  }

  public updateEventById(id: guid) {
    requestEvent(id)
      .then((r) => eventViewModelToEvent(r.event))
      .then((event) => {
        const prevEvent = this.getEventById(event.id);
        if (!prevEvent) return;
        const eventIndex = this.events.indexOf(prevEvent);
        this.events.splice(eventIndex, 1, event);
      });
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
      const newEvents = ev.map(eventViewModelToEvent);
      this.events = newEvents;
      this.putEventsToLocationStore(newEvents);
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

  private putEventsToLocationStore = (events: Event[]) => {
    const eventLocations = events.map(eventToEventLocationViewModel);
    globalStore.eventLocationStore.setRange(eventLocations);
  };

  private static async getFullInfo(
    eventsIds: Array<guid>
  ): Promise<EventViewModel[]> {
    const eventsModel = new EventIdsModel(eventsIds);
    const { events } = await requestEventsFullInfo(eventsModel);
    return events;
  }

  addBalloonEvent(event: Event) {
    this.balloonEvent = event;
    this.addEvent(event);
  }

  public getBalloonEvent(): Event | null {
    return this.balloonEvent;
  }

  resetBalloonEvent() {
    this.balloonEvent = null;
  }
}
