import { BASE_ROUTE, HTTP_METHODS } from "../../utils";
import { SubscriptionsCountViewModel } from "../../../viewModels/SubscriptionsCountViewModel";
import { guid } from "../../../viewModels/Guid";

export async function addSubscription(
  eventId: guid
): Promise<SubscriptionsCountViewModel> {
  const url = `${BASE_ROUTE}/api/subscriptions/${eventId}`;
  const options = {
    headers: {
      method: HTTP_METHODS.PUT,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  return await response.json();
}
