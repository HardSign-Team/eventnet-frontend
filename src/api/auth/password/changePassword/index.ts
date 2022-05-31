import { BASE_ROUTE, HTTP_METHODS, STATUS_CODES } from "../../../utils";
import { refreshToken } from "../../refreshToken";
import globalStore from "../../../../stores/GlobalStore";

async function changePassword(oldPassword: string, newPassword: string) {
  const response = await request(oldPassword, newPassword);
  if (response.statusText === "Unauthorized") {
    await refreshToken();
    return (await request(oldPassword, newPassword)).status === STATUS_CODES.OK;
  } else return response.status === STATUS_CODES.OK;
}

async function request(oldPassword: string, newPassword: string) {
  return await fetch(`${BASE_ROUTE}/api/auth/change-password`, {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      Authorization: `Bearer ${globalStore.userStore.getAccessToken()}`,
    },
    body: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword,
    }),
  });
}

export { changePassword };
