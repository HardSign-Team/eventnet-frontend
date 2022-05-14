import { BASE_ROUTE, HTTP_METHODS } from "../../utils";

export type userInfo = {
  login: string;
  password: string;
};

async function loginRequest(user: userInfo) {
  const response = fetch(BASE_ROUTE + "/api/auth/login", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  });
  return await response;
}

export { loginRequest };
