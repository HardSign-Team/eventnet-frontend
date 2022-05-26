import { MarksCountViewModel } from "../../../viewModels/MarksCountViewModel";
import { BASE_ROUTE, HTTP_METHODS } from "../../utils";
import { guid } from "../../../viewModels/Guid";

export async function addLike(
  eventId: guid,
  token: string
): Promise<MarksCountViewModel> {
  const url = `${BASE_ROUTE}/api/marks/likes/${eventId}`;
  const options = {
    headers: {
      method: HTTP_METHODS.PUT,
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  const response = await fetch(url, options);
  return await response.json();
}