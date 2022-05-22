import { MarksCountViewModel } from "../../../viewModels/MarksCountViewModel";
import { BASE_ROUTE, HTTP_METHODS } from "../../utils";
import { guid } from "../../../viewModels/Guid";

export async function deleteDislike(
  eventId: guid,
  token: string
): Promise<MarksCountViewModel> {
  const url = `${BASE_ROUTE}/api/marks/dislikes/${eventId}`;
  const options = {
    headers: {
      method: HTTP_METHODS.DELETE,
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  const response = await fetch(url, options);
  return await response.json();
}
