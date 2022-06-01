import {UserShortInfoViewModel} from "../../viewModels/UserShortInfoViewModel";
import {BASE_ROUTE, HTTP_METHODS} from "../utils";
import {guid} from "../../viewModels/Guid";

export async function getUserShortInfo(
    userId: guid
): Promise<UserShortInfoViewModel> {
    const url = `${BASE_ROUTE}/api/users/${userId}`;
    const options = {
        method: HTTP_METHODS.GET,
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    return await response.json();
}
