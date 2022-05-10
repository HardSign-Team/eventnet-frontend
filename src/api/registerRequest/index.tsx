import {RegisterModel} from "../../dto/RegisterModel";

async function registerRequest(registerModel: RegisterModel) {
  console.log(registerModel);
  const response = await fetch("http://localhost:5203/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify(registerModel),
  });
  return await response.json();
}

export { registerRequest };
