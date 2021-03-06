import { guid } from "../../viewModels/Guid";
import { BASE_ROUTE, STATUS_CODES } from "../utils";

export enum EventSaveStatus {
  Saved,
  NotSavedDueToError,
  InProgress,
  LongWaiting,
}

export async function getIsCreated(
  token: string,
  eventId: guid
): Promise<EventSaveStatus> {
  const params = buildIsCreatedUrlParams(eventId);
  const url = `${BASE_ROUTE}/api/events/is-created?${params.toString()}`;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  switch (response.status) {
    case STATUS_CODES.ACCEPTED:
      return EventSaveStatus.InProgress;
    case STATUS_CODES.OK:
      return EventSaveStatus.Saved;
    case STATUS_CODES.BAD_REQUEST:
      return EventSaveStatus.NotSavedDueToError;
    default:
      throw new Error(`Response not expected: ${response.status}`);
  }
}

function buildIsCreatedUrlParams(eventId: guid): URLSearchParams {
  const params: URLSearchParams = new URLSearchParams();
  params.append("id", eventId);
  return params;
}
