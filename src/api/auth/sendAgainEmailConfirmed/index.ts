async function sendAgainEmailConfirmed(userId: string) {
  return fetch("http://localhost:5203/api/auth/email-confirmation-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify({ userId: userId }),
  })
    .then((x) => x.json())
    .catch((err) => console.error(err));
}

export { sendAgainEmailConfirmed };
