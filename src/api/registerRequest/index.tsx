export type userInfoRegister = {
  userName: string;
  email: string;
  password: string;
  phone: string;
};

async function registerRequest(userInfo: userInfoRegister) {
  return await fetch("http://localhost:5203/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify(userInfo),
  })
    .then((x) => x.json())
    .then((x) => console.log(x.message))
    .catch((err) => console.log(err.message));
}

export { registerRequest };
