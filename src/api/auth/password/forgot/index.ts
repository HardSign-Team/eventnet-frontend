import { BASE_ROUTE, HTTP_METHODS, STATUS_CODES } from "../../../utils";

async function forgot(email: string) {
  const response = await fetch(BASE_ROUTE + "/api/auth/password/forgot", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  return response.status === STATUS_CODES.OK;
}

export { forgot as forgotPassword };
