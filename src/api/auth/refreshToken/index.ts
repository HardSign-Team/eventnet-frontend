import { BASE_ROUTE, HTTP_METHODS } from "../../utils";

async function refreshToken(refreshToken: string) {
  return fetch(BASE_ROUTE + "/api/token/refresh-token", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify({ refreshToken: refreshToken }),
  })
    .then((x) => x.json())
    .catch((err) => console.error(err));
}

export { refreshToken };
