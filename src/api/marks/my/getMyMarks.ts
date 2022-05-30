import {guid} from "../../../viewModels/Guid";
import {MarksCountViewModel} from "../../../viewModels/MarksCountViewModel";
import {BASE_ROUTE, HTTP_METHODS} from "../../utils";

export async function getMyMarks(
    eventId: guid,
    token: string
): Promise<MarksCountViewModel> {
    const url = `${BASE_ROUTE}/api/marks/my/${eventId}`;
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