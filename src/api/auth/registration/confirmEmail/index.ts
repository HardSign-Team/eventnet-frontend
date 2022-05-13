import { BASE_ROUTE, HTTP_METHODS } from "../../../utils";

async function confirmEmail(userId: string, code: string) {
  return fetch(BASE_ROUTE + "/api/auth/email-confrimation-message", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      code: code,
    }),
  })
    .then((x) => x.json())
    .catch((err) => console.error(err));
}

export { confirmEmail };
