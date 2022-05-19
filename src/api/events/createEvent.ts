import { CreateEventModel } from "../../dto/CreateEventModel";
import { BASE_ROUTE, HTTP_METHODS, STATUS_CODES } from "../utils";

type CreateEventResponse = {
  accepted: boolean;
};

export async function createEvent(
  token: string,
  model: CreateEventModel
): Promise<CreateEventResponse> {
  const url = `${BASE_ROUTE}/api/events`;
  const formData = createFormData(model);
  const options: RequestInit = {
    method: HTTP_METHODS.POST,
    body: formData,
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  return {
    accepted: response.status === STATUS_CODES.ACCEPTED,
  };
}

function createFormData(model: CreateEventModel): FormData {
  const formData = new FormData();

  formData.append("eventId", model.id);
  formData.append("name", model.name);
  formData.append("description", model.description);
  formData.append("startDate", model.startDate.toISOString());
  if (model.endDate) formData.append("endDate", model.endDate.toISOString());
  formData.append("latitude", model.location.latitude.toString());
  formData.append("longitude", model.location.longitude.toString());
  model.tags.forEach((tag) => formData.append("tags", tag));
  model.photos.forEach((photo) => formData.append("photos", photo.file));

  return formData;
}
