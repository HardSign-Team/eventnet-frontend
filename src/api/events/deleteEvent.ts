import {guid} from "../../viewModels/Guid";
import {BASE_ROUTE, HTTP_METHODS, STATUS_CODES} from "../utils";

export async function deleteEvent(eventId: guid) : Promise<boolean> {
    const url = `${BASE_ROUTE}/api/events/${eventId}`;
    const options = {
        method: HTTP_METHODS.DELETE,
        headers: {
            "Content-type": "application/json"
        }
    };
    const response = await fetch(url, options);
    return response.status === STATUS_CODES.OK;
}