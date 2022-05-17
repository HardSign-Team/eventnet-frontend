import { RegisterModel } from "../../../../dto/RegisterModel";
import { BASE_ROUTE, HTTP_METHODS } from "../../../utils";

async function registerRequest(registerModel: RegisterModel) {
  return await fetch(BASE_ROUTE + "/api/auth/register", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify(registerModel),
  });
}

export { registerRequest };
