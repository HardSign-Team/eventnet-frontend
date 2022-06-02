import {
  AuthorizedRequest,
  BASE_ROUTE,
  HTTP_METHODS,
  STATUS_CODES,
} from "../../utils";
import globalStore from "../../../stores/GlobalStore";

async function logout() {
  const response = await AuthorizedRequest(request);
  return response.status === STATUS_CODES.OK;
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
