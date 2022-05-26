import { BASE_ROUTE, HTTP_METHODS, STATUS_CODES } from "../../utils";
import { refreshToken } from "../refreshToken";
import globalStore from "../../../stores/GlobalStore";

async function logout() {
  const response = await request();
  if (response.statusText === "Unauthorized") {
    await refreshToken();
    return (await request()).status === STATUS_CODES.OK;
  } else return response.status === STATUS_CODES.OK;
}

async function request() {
  return await fetch(BASE_ROUTE + "/api/auth/logout", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      Authorization: "Bearer " + globalStore.userStore.getAccessToken(),
    },
    body: JSON.stringify(globalStore.userStore.getRefreshToken()),
  });
}

export { logout as logoutRequest };
