import { EventViewModel } from "../../viewModels/EventViewModel";
import { BASE_ROUTE } from "../utils";

type RequestMyEventsResponse = {
  events: EventViewModel[];
};

export async function requestMyEvents(
  token: string
): Promise<RequestMyEventsResponse> {
  const url = `${BASE_ROUTE}/api/events/my`;
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  return {
    events: await response.json(),
  };
}
