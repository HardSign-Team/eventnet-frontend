import Event from "../models/Event";
import EventInfo from "../models/EventInfo";
import { EventLocationViewModel } from "../viewModels/EvenLocationViewModel";
import { makeAutoObservable } from "mobx";
import { guid } from '../viewModels/Guid';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

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
    const a = events.map((event) => {
      return {
        id: event.id,
        info: {
          name: event.name,
          coordinates: [event.location.latitude, event.location.longitude],
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
    const ids = new Set(this.events.map((x) => x.id));
    this.events = this.events.filter((ev) => {
      if (ids.has(ev.id)) {
        ids.delete(ev.id);
        return true;
      } else {
        return false;
      }
    });
    console.log(this.events)
  }
}
