import {guid} from "../../viewModels/Guid";
import {BASE_ROUTE} from "../utils";

export async function requestEventCreation() : Promise<guid> {
    const url = `${BASE_ROUTE}/api/events/request-event-creation`;
    const options = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const response = await fetch(url, options);
    return response.json();
}