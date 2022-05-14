import { BASE_ROUTE, HTTP_METHODS, STATUS_CODES } from "../../utils";

async function logout(token: string) {
  const response = await fetch(BASE_ROUTE + "/api/auth/logout", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return response.status === STATUS_CODES.OK;
}

export { logout as logoutRequest };
