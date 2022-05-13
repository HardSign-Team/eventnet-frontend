import {CreateEventModel} from "../../dto/CreateEventModel";
import {BASE_ROUTE, STATUS_CODES} from "../utils";

type CreateEventResponse = {
    accepted: boolean;
}

export async function createEvent(model: CreateEventModel) : Promise<CreateEventResponse> {
    const url = `${BASE_ROUTE}/api/events`;
    const formData = createFormData(model);
    const options : RequestInit = {
        method: "POST",
        body: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    const response = await fetch(url, options);
    return {
        accepted: response.status === STATUS_CODES.ACCEPTED
    }
}

function createFormData(model: CreateEventModel) : FormData {
    const formData = new FormData();

    formData.append("Id", model.id);
    formData.append("StartDate", model.startDate.toUTCString());
    if (model.endDate) {
        formData.append("EndDate", model.endDate.toUTCString())
    }
    formData.append("Name", model.name);
    if (model.description) {
        formData.append("Description", model.description);
    }
    formData.append("Location", JSON.stringify(model.location));
    formData.append("Photos", JSON.stringify(model.photos));

    return formData;
}
