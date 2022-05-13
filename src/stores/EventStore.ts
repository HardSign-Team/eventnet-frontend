import Event from "../models/Event";
import EventInfo from "../models/EventInfo";
import {EventLocationViewModel} from "../viewModels/EvenLocationViewModel";
import {makeAutoObservable} from "mobx";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

export class EventStore {
  public events: Array<Event> = []; //EventStore.fillEvents();

  private mockedId: number = 1;

  constructor() {
    makeAutoObservable(this, {});
  }

  // noinspection JSUnusedLocalSymbols
  private static fillEvents() {
    let result: Array<Event> = [
      {
        id: 1,
        info: {
          name: "День пикачу",
          coordinates: [56.817076, 60.611855],
          dateStart: new Date(2021, 10, 15),
          likes: 2,
          description:
            "В те же дни один хорошо знакомый мне унтер-офицер из шестой, брат которого незадолго до того погиб, был смертельно ранен найденной миной: он отвинтил взрыватель и, заметив, что вытряхнутый зеленоватый порох весь обгорел, сунул в отверстие тлеющую сигарету. Мина, естественно, взорвалась, нанеся ему пятьдесят ран. Так или подобным образом мы ежеминутно несли потери по легкомыслию, бывшему следствием беспрестанного общения со взрывчатыми материалами.",
          dateEnd: new Date(2021, 10, 15),
          photos: [
            "https://cdn.iz.ru/sites/default/files/styles/1920x1080/public/article-2019-06/ZURR4215.JPG.jpg?itok=2KMsqbt9",
          ],
        },
      },
      {
        id: 2,
        info: {
          coordinates: [55.817076, 61.611855],
          name: "01.06.2022",
          dateStart: new Date(2022, 6, 1, 12, 28, 1),
          likes: 0,
          description: "Челлендж окончен",
          dateEnd: new Date(2022, 6, 3, 14, 14, 10),
          photos: [
            "https://cdn.iz.ru/sites/default/files/styles/1920x1080/public/article-2019-06/ZURR4215.JPG.jpg?itok=2KMsqbt9",
          ],
        },
      },
    ];
    for (let i = 3; i < 200; i++) {
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

  public getEventById(id: number): Event | undefined {
    return this.events.find((event) => event.id === id);
  }

  public deleteEvent(event: Event) {
    this.events = this.events.filter((ev) => ev.id === event.id);
  }

  addEvents(events: Array<EventLocationViewModel>) {
      // TODO заглушка
    const a = events.map(e => {
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
            "https://cdn.iz.ru/sites/default/files/styles/1920x1080/public/article-2019-06/ZURR4215.JPG.jpg?itok=2KMsqbt9",
          ],
        },
      }
    });
    for (const e of a) {
      this.events.push(e as Event);
    }
    console.log(this.events)
  }
}
