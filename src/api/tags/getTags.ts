import { BASE_ROUTE } from "../utils";
import { TagNameViewModel } from "../../viewModels/TagNameViewModel";

type RequestEventResponse = Array<TagNameViewModel>;
export async function requestTags(
  name: string,
  count: number
): Promise<RequestEventResponse> {
  const url = `${BASE_ROUTE}/api/tags/search/name/${name}?mc=${count}`;
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  return await response.json();
}
