import { RequestEventDto } from "../../dto/RequestEventDto";
import { Base64 } from "js-base64";
import { EventLocationViewModel } from "../../viewModels/EvenLocationViewModel";
import { BASE_ROUTE } from "../utils";

type RequestEventsResponse = {
  events: Array<EventLocationViewModel>
};

export async function requestEvents(
  params: URLSearchParams
): Promise<RequestEventsResponse> {
  const url = `${BASE_ROUTE}/api/events?${params}`;
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  console.log(response);
  return {
    events: await response.json()
  };
}

export function buildRequestEventsParams(
  dto: RequestEventDto
): URLSearchParams {
  const result: URLSearchParams = new URLSearchParams();
  result.set("f", Base64.toBase64(JSON.stringify(dto.filterModel), false));
  if (dto.pageInfo) {
    result.set("p", dto.pageInfo.pageNumber.toString());
    result.set("ps", dto.pageInfo.pageSize.toString());
  }
  return result;
}
