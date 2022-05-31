import { MarksCountViewModel } from "../../../viewModels/MarksCountViewModel";
import { BASE_ROUTE, HTTP_METHODS } from "../../utils";
import { guid } from "../../../viewModels/Guid";

export async function deleteDislike(
  eventId: guid,
  token: string
): Promise<MarksCountViewModel> {
  const url = `${BASE_ROUTE}/api/marks/dislikes/${eventId}`;
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
