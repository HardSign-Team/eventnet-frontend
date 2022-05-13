import { CreateEventModel } from "../../dto/CreateEventModel";
import { BASE_ROUTE, STATUS_CODES } from "../utils";

type CreateEventResponse = {
  accepted: boolean;
};

export async function createEvent(
  model: CreateEventModel
): Promise<CreateEventResponse> {
  const url = `${BASE_ROUTE}/api/events`;
  const formData = createFormData(model);
  const options: RequestInit = {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await fetch(url, options);
  return {
    accepted: response.status === STATUS_CODES.ACCEPTED,
  };
}

function createFormData(model: CreateEventModel): FormData {
  const formData = new FormData();
  const info: { [index: string]: string } = {
    EventId: model.id,
    StartDate: model.startDate.toUTCString(),
    Name: model.name,
    Location: JSON.stringify({
      Latitude: model.location.latitude,
      Longitude: model.location.longitude,
    }),
    Tags: JSON.stringify(model.tags),
  };

  if (model.endDate) info["EndDate"] = model.endDate.toUTCString();
  if (model.description) info["Description"] = model.description;

  formData.append("Info", JSON.stringify(info));
  formData.append("Photos", JSON.stringify(model.photos));

  return formData;
}
