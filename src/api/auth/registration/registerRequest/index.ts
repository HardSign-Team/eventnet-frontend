import { BASE_ROUTE, HTTP_METHODS } from "../../../utils";

export type userInfoRegister = {
  birthDate: string;
  confirmPassword: string;
  email: string;
  gender: string;
  password: string;
  userName: string;
};

async function registerRequest(userInfo: userInfoRegister) {
  return (
    fetch(BASE_ROUTE + "/api/auth/register", {
      method: HTTP_METHODS.POST,
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify(userInfo),
    })
      // .then((x) => x.json())
      .catch((err) => console.error(err))
  );
}

export { registerRequest };
