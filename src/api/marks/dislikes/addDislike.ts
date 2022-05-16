import { MarksCountViewModel } from "../../../viewModels/MarksCountViewModel";
import { BASE_ROUTE, HTTP_METHODS } from "../../utils";
import { guid } from "../../../viewModels/Guid";

export async function addDislike(eventId: guid): Promise<MarksCountViewModel> {
  const url = `${BASE_ROUTE}/api/marks/dislikes/${eventId}`;
  const options = {
    headers: {
      method: HTTP_METHODS.PUT,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  return await response.json();
}
