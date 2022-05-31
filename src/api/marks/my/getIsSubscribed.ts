import {guid} from "../../../viewModels/Guid";
import {BASE_ROUTE, HTTP_METHODS} from "../../utils";
import {IsSubscribedViewModel} from "../../../viewModels/IsSubscribedViewModel";

export async function getIsSubscribed(
    eventId: guid,
    token: string
): Promise<IsSubscribedViewModel> {
    const url = `${BASE_ROUTE}/api/subscriptions/me/${eventId}`;
    const options = {
        method: HTTP_METHODS.GET,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(url, options);
    return await response.json();
}