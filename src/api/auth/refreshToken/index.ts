async function refreshToken(refreshToken: string) {
  return fetch("http://localhost:5203/api/token/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify({ refreshToken: refreshToken }),
  })
    .then((x) => x.json())
    .catch((err) => console.log(err));
}

export { refreshToken };
