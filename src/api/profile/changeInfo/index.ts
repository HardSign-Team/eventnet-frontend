import globalStore from "../../../stores/GlobalStore";
import {
  AuthorizedRequest,
  BASE_ROUTE,
  HTTP_METHODS,
  STATUS_CODES,
} from "../../utils";

async function changeInfo(userName: string, birthDate: string, gender: string) {
  const response = await AuthorizedRequest(() =>
    request(userName, birthDate, gender)
  );
  return response.status === STATUS_CODES.OK;
}

async function request(userName: string, birthDate: string, gender: string) {
  const generateDate = (date: string) => {
    const arr = date.split(".");
    return arr[2] + "-" + arr[1] + "-" + arr[0];
  };
  return await fetch(
    `${BASE_ROUTE}/api/users/${globalStore.userStore.getId()}`,
    {
      method: HTTP_METHODS.PUT,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
        Authorization: `Bearer ${globalStore.userStore.getAccessToken()}`,
      },
      body: JSON.stringify({
        userName: userName,
        birthDate: generateDate(birthDate),
        gender: gender,
      }),
    }
  );
}

export { changeInfo };
