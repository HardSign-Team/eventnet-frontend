import { BASE_ROUTE } from "../utils";

type GetEventPhotosResponse = {
  photos: string[];
};

export async function getEventPhotos(
  id: string
): Promise<GetEventPhotosResponse> {
  const url = `${BASE_ROUTE}/api/photos/${id}`;
  const options = {
    headers: {
      Accept: "application/json",
    },
  };
  const response = await fetch(url, options);
  return {
    photos: await response.json(),
  };
}
