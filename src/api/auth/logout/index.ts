import { BASE_ROUTE, HTTP_METHODS, STATUS_CODES } from "../../utils";
import { refreshToken } from "../refreshToken";
import globalStore from "../../../stores/GlobalStore";

async function logout(token: string) {
  const response = await request(token);
  if (response.statusText === "Unauthorized") {
    await refreshToken(globalStore.userStore.refreshToken, token);
    return (
      (await request(globalStore.userStore.accessToken)).status ===
      STATUS_CODES.OK
    );
  } else return response.status === STATUS_CODES.OK;
}

async function request(token: string) {
  return await fetch(BASE_ROUTE + "/api/auth/logout", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export { logout as logoutRequest };
