export type userInfo = {
  login: string;
  password: string;
};

async function loginRequest(user: userInfo) {
  return fetch("http://localhost:5203/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((x) => x.json())
    .catch((err) => console.log(err));
}

export { loginRequest };
