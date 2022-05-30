import { EventViewModel } from "../viewModels/EventViewModel";
import Event from "../models/Event";
import { EventLocationViewModel } from "../viewModels/EvenLocationViewModel";
import { guid } from "../viewModels/Guid";
import { LocationViewModel } from "../viewModels/LocationViewModel";
import { Coordinates } from "../models/Coordinates";

export const eventViewModelToEvent = (event: EventViewModel): Event => {
  return {
    id: event.id,
    info: {
      dateStart: new Date(event.startDate),
      name: event.name,
      coordinates: [event.location.latitude, event.location.longitude],
      dateEnd: new Date(event.endDate || ""),
      description: event.description,
      likes: event.marks.likes,
      dislikes: event.marks.dislikes,
      participants: event.totalSubscriptions,
    },
  };
};

export const eventToEventLocationViewModel = (
  event: Event
): EventLocationViewModel => {
  return {
    id: event.id,
    location: coordinatesToLocation(event.info.coordinates),
    name: event.info.name,
  };
};

export const coordinatesToLocation = (
  coordinates: Coordinates
): LocationViewModel => {
  return {
    latitude: coordinates[0],
    longitude: coordinates[1],
  };
};

export const locationToCoordinates = (
  location: LocationViewModel
): Coordinates => {
  return [location.latitude, location.longitude];
};
