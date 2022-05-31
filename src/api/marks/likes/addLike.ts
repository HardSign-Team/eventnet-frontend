import { MarksCountViewModel } from "../../../viewModels/MarksCountViewModel";
import { BASE_ROUTE, HTTP_METHODS } from "../../utils";
import { guid } from "../../../viewModels/Guid";

export async function addLike(
  eventId: guid,
  token: string
): Promise<MarksCountViewModel> {
  const url = `${BASE_ROUTE}/api/marks/likes/${eventId}`;
  const options = {
    method: HTTP_METHODS.PUT,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  return await response.json();
}
