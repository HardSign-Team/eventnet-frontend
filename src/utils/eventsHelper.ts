import EventInfo from "../models/EventInfo";

export const isEventRelevant = (eventInfo: EventInfo) => {
  if (!eventInfo.dateEnd) return true;

  return eventInfo.dateEnd?.getTime() - new Date().getTime() > 0;
};