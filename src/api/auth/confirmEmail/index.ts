async function confirmEmail(userId: string, token: string) {
  return fetch("http://localhost:5203/api/auth/email-confrimation-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      userId: userId,
    }),
  })
    .then((x) => x.json())
    .catch((err) => console.log(err));
}

export { confirmEmail };
