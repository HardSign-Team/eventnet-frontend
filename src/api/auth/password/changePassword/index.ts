import {
  AuthorizedRequest,
  BASE_ROUTE,
  HTTP_METHODS,
  STATUS_CODES,
} from "../../../utils";
import globalStore from "../../../../stores/GlobalStore";

async function changePassword(oldPassword: string, newPassword: string) {
  const response = await AuthorizedRequest(() =>
    request(oldPassword, newPassword)
  );
  return response.status === STATUS_CODES.OK;
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
