import { refreshToken } from "../../auth/refreshToken";
import globalStore from "../../../stores/GlobalStore";
import { BASE_ROUTE, HTTP_METHODS, STATUS_CODES } from "../../utils";

async function changeInfo(userName: string, birthDate: string, gender: string) {
  const response = await request(userName, birthDate, gender);
  if (response.statusText === "Unauthorized") {
    await refreshToken();
    return (
      (await request(userName, birthDate, gender)).status === STATUS_CODES.OK
    );
  } else return response.status === STATUS_CODES.OK;
}

async function request(userName: string, birthDate: string, gender: string) {
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
        birthDate: birthDate,
        gender: gender,
      }),
    }
  );
}

export { changeInfo };
