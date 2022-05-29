import { guid } from "../../viewModels/Guid";
import { BASE_ROUTE } from "../utils";
import { EventViewModel } from "../../viewModels/EventViewModel";

type RequestEventResponse = {
  event: EventViewModel;
};

export async function requestEvent(id: guid): Promise<RequestEventResponse> {
  const url = `${BASE_ROUTE}/api/events/${id}`;
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  return {
    event: await response.json(),
  };
}
