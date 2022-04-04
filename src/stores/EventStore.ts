import { makeAutoObservable } from "mobx";
import Event from "../models/Event";
import EventInfo from "../models/EventInfo";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

export class EventStore {
  public events: Array<Event> = this.fillEvents();

  private mockedId: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  private fillEvents() {
    let result: Array<Event> = [
      {
        id: 1,
        info: {
          name: "День пикачу",
          coordinates: [56.817076, 60.611855],
          dateStart: new Date(2021, 10, 15),
          likes: 2,
          description: "Абемнта купили называется",
          dateEnd: new Date(2021, 10, 15),
        },
      },
      {
        id: 2,
        info: {
          coordinates: [55.817076, 61.611855],
          name: "01.06.2022",
          dateStart: new Date(2022, 6, 1),
          likes: 0,
          description: "Челлендж окончен",
          dateEnd: new Date(2022, 6, 2),
        },
      },
    ];
    for (let i = 3; i < 250; i++) {
      result.push({
        id: i,
        info: {
          coordinates: [getRandomInt(-90, 90), getRandomInt(0, 360)],
          name: "01.06.2022",
          dateStart: new Date(2022, 6, 1),
          likes: 0,
          description: "Челлендж окончен",
          dateEnd: new Date(2022, 6, 2),
        },
      });
    }
    return result;
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
