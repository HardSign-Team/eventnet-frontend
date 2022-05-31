import { BASE_ROUTE, HTTP_METHODS } from "../../utils";
import {SubscribedEventsIdsModel} from "../../../dto/SubscribedEventsIdsModel";

export async function getMySubscriptions(
  token: string
): Promise<SubscribedEventsIdsModel> {
  const url = `${BASE_ROUTE}/api/subscriptions/my`;
  const options = {
    method: HTTP_METHODS.GET,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  return await response.json();
}