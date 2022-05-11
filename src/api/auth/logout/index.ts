import { BASE_ROUTE, HTTP_METHODS } from "../../utils";

async function logout(token: string) {
  return fetch(BASE_ROUTE + "/api/auth/logout", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      Authorization: token,
    },
  })
    .then((x) => x.json())
    .catch((err) => console.error(err));
}

export { logout };
