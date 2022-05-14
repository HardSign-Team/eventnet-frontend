import { BASE_ROUTE, HTTP_METHODS, STATUS_CODES } from "../../../utils";

async function sendCodeForgotPassword(email: string, code: string) {
  const response = await fetch(BASE_ROUTE + "/api/auth/password/forgot/code", {
    method: HTTP_METHODS.GET,
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify({
      email: email,
      code: code,
    }),
  });
  return response.status === STATUS_CODES.OK;
}

export { sendCodeForgotPassword };
