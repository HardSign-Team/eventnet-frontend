import { RequestEventDto } from "../../dto/RequestEventDto";
import { Base64 } from "js-base64";
import { EventLocationViewModel } from "../../viewModels/EvenLocationViewModel";
import { BASE_ROUTE, HTTP_METHODS } from "../utils";
import { EventViewModel } from "../../viewModels/EventViewModel";
import { EventIdsModel } from "../../dto/EventIdsModel";

type RequestEventsResponse = {
  events: Array<EventLocationViewModel>;
};

export async function requestEvents(
  params: URLSearchParams
): Promise<RequestEventsResponse> {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const events = [];
  let evs: any = [];
  do {
    const url = `${BASE_ROUTE}/api/events?${params}`;
    const response = await fetch(url, options);
    const pageNumber = +(params.get("p") || 1);
    evs = await response.json();
    events.push(...evs);
    await params.set("p", String(pageNumber + 1));
  } while (evs.length !== 0);
  return {
    events,
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

type RequestEventsFullInfo = {
  events: Array<EventViewModel>;
};

export async function requestEventsFullInfo(
  model: EventIdsModel
): Promise<RequestEventsFullInfo> {
  const body = JSON.stringify(model);
  const url = `${BASE_ROUTE}/api/events/full`;
  const options = {
    method: HTTP_METHODS.POST,
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  return {
    events: await response.json(),
  };
}
