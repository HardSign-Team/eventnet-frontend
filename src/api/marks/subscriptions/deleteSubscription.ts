import { BASE_ROUTE, HTTP_METHODS } from "../../utils";
import { SubscriptionsCountViewModel } from "../../../viewModels/SubscriptionsCountViewModel";
import { guid } from "../../../viewModels/Guid";

export async function deleteSubscription(
  eventId: guid,
  token: string
): Promise<SubscriptionsCountViewModel> {
  const url = `${BASE_ROUTE}/api/subscriptions/${eventId}`;
  const options = {
    method: HTTP_METHODS.DELETE,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  return await response.json();
}
