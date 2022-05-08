async function resetPasswordRequest(oldPassword: string, newPassword: string) {
  return fetch("http://localhost:5203/api/auth/change-password", {
    method: "POST",
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
