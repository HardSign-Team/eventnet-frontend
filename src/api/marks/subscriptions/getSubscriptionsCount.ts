import { BASE_ROUTE, HTTP_METHODS } from "../../utils";
import { SubscriptionsCountViewModel } from "../../../viewModels/SubscriptionsCountViewModel";
import { guid } from "../../../viewModels/Guid";

export async function getSubscriptionsCount(
  eventId: guid
): Promise<SubscriptionsCountViewModel> {
  const url = `${BASE_ROUTE}/api/subscriptions/count/${eventId}`;
  const options = {
    method: HTTP_METHODS.GET,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  return await response.json();
}
