import { BASE_ROUTE, HTTP_METHODS, STATUS_CODES } from "../../../utils";

async function confirmEmail(userId: string, code: string) {
  const response = await fetch(
    BASE_ROUTE + "/api/auth/confirm-email?userId=" + userId + "&code=" + code,
    {
      method: HTTP_METHODS.POST,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
      },
    }
  );
  return response.status === STATUS_CODES.OK;
}

export { confirmEmail };
