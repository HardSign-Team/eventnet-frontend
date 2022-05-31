import { refreshToken } from "../../auth/refreshToken";
import globalStore from "../../../stores/GlobalStore";
import { BASE_ROUTE, HTTP_METHODS, STATUS_CODES } from "../../utils";

async function updatePhoto(avatar: File) {
  let response = await request(avatar);
  if (response.statusText === "Unauthorized") {
    await refreshToken();
    response = await request(avatar);
  }
  if (response.status === STATUS_CODES.OK) {
    return await response.json();
  } else return false;
}

async function request(avatar: File) {
  const formData = new FormData();
  formData.append("Avatar", avatar);

  return await fetch(`${BASE_ROUTE}/api/users/avatar`, {
    method: HTTP_METHODS.POST,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${globalStore.userStore.getAccessToken()}`,
    },
    body: formData,
  });
}

export { updatePhoto };
