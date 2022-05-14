import { BASE_ROUTE, HTTP_METHODS, STATUS_CODES } from "../../../utils";

async function sendAgainEmailConfirmed(userName: string) {
  const response = await fetch(
    BASE_ROUTE + "/api/auth/email-confirmation-message?userName=" + userName,
    {
      method: HTTP_METHODS.POST,
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
    }
  );
  return response.status === STATUS_CODES.OK;
}

export { sendAgainEmailConfirmed };
