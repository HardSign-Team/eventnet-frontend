import { BASE_ROUTE, HTTP_METHODS } from "../../../utils";

async function resetPassword(
  token: string,
  mail: string,
  newPassword: string,
  confirmNewPassword: string
) {
  return fetch(BASE_ROUTE + "/api/auth/password/reset", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify({
      code: token,
      email: mail,
      newPassword: newPassword,
      newPasswordConfirm: confirmNewPassword,
    }),
  })
    .then((x) => x.json())
    .catch((err) => console.error(err));
}

export { resetPassword };
