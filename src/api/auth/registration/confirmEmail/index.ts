async function confirmEmail(userId: string, code: string) {
  return fetch("http://localhost:5203/api/auth/email-confrimation-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      code: code,
    }),
  })
    .then((x) => x.json())
    .catch((err) => console.error(err));
}

export { confirmEmail };
