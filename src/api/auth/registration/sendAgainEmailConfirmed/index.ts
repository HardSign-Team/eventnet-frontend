import { BASE_ROUTE, HTTP_METHODS } from "../../../utils";

async function sendAgainEmailConfirmed(userId: string) {
  return fetch(BASE_ROUTE + "/api/auth/email-confirmation-message", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify({ userId: userId }),
  })
    .then((x) => x.json())
    .catch((err) => console.error(err));
}

export { sendAgainEmailConfirmed };
