export type userInfoRegister = {
  birthDate: string;
  confirmPassword: string;
  email: string;
  gender: string;
  password: string;
  userName: string;
};

async function registerRequest(userInfo: userInfoRegister) {
  return fetch("http://localhost:5203/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify(userInfo),
  })
    .then((x) => x.json())
    .catch((err) => console.error(err));
}

export { registerRequest };
