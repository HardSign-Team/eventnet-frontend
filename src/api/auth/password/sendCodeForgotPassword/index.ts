import { BASE_ROUTE, HTTP_METHODS } from "../../../utils";

async function sendCodeForgotPassword(email: string, code: string) {
  return fetch(BASE_ROUTE + "/api/auth/password/forgot/code", {
    method: HTTP_METHODS.GET,
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify({
      email: email,
      code: code,
    }),
  })
    .then((x) => x.json())
    .catch((err) => console.error(err));
}

export { sendCodeForgotPassword };
