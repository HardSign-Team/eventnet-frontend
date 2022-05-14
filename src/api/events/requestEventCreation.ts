import { guid } from "../../viewModels/Guid";
import { BASE_ROUTE } from "../utils";

export async function requestEventCreation(token: string): Promise<guid> {
  const url = `${BASE_ROUTE}/api/events/request-event-creation`;
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    Authorization: "Bearer " + token,
  };
  const response = await fetch(url, options);
  return response.json();
}