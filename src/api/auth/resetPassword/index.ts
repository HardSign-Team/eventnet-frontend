async function resetPassword(
  token: string,
  mail: string,
  newPassword: string,
  confirmNewPassword: string
) {
  return fetch("http://localhost:5203/api/auth/password/reset", {
    method: "POST",
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
