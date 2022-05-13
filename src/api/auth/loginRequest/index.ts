import { BASE_ROUTE, HTTP_METHODS } from "../../utils";

export type userInfo = {
  login: string;
  password: string;
};

async function loginRequest(user: userInfo) {
  return fetch(BASE_ROUTE + "/api/auth/login", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((x) => x.json())
    .catch((err) => console.error(err));
}

export { loginRequest };
