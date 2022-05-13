import { BASE_ROUTE, HTTP_METHODS } from "../../../utils";

async function resetPasswordRequest(oldPassword: string, newPassword: string) {
  return fetch(BASE_ROUTE + "/api/auth/change-password", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword,
    }),
  })
    .then((x) => x.json())
    .catch((err) => console.error(err));
}

export { resetPasswordRequest };
