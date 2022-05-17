import { BASE_ROUTE, HTTP_METHODS, STATUS_CODES } from "../../../utils";

async function resetPassword(
  code: string,
  email: string,
  newPassword: string,
  confirmNewPassword: string
) {
  const response = await fetch(
    BASE_ROUTE +
      "/api/auth/password/reset?code=" +
      code +
      "&email=" +
      email +
      "&newPassword=" +
      newPassword +
      "&newPasswordConfirm=" +
      confirmNewPassword,
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

export { resetPassword };
