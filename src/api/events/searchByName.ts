import {BASE_ROUTE} from "../utils";
import {int} from "../../viewModels/Int";
import {EventNameViewModel} from "../../viewModels/EventNameViewModel";

type SearchByNameResponse = {
    events: EventNameViewModel[]
}

export async function requestSearchByName(name: string, maxCount?: int): Promise<SearchByNameResponse> {
    const params = buildParameters(maxCount)
    const url = `${BASE_ROUTE}/api/events/search/name/${name}` + (params ? `?${params}` : "");
    const options = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    return {
        events: await response.json()
    };
}

function buildParameters(maxCount?: int) {
    const params = new URLSearchParams();
    if (maxCount !== undefined) {
        params.set("m", maxCount.toString());
    }
    return params.toString();
}