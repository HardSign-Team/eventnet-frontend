async function sendCodeForgotPassword(email: string, code: string) {
  return fetch("http://localhost:5203/api/auth/password/forgot/code", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify({
      email: email,
      code: code,
    }),
  })
    .then((x) => x.json())
    .catch((err) => console.error(err));
}

export { sendCodeForgotPassword };
