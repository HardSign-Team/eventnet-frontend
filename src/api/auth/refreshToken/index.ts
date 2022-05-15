import { BASE_ROUTE, HTTP_METHODS, STATUS_CODES } from "../../utils";
import globalStore from "../../../stores/GlobalStore";

async function refreshToken(refreshToken: string, token: string) {
  console.log(refreshToken);
  console.log(token);
  const response = await fetch(BASE_ROUTE + "/api/token/refresh-token", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ refreshToken: refreshToken }),
  });

  if (response.status === STATUS_CODES.OK) {
    const answer = await response.json();
    const userStore = globalStore.userStore;
    userStore.saveTokens(
      answer.accessToken,
      answer.refreshToken,
      answer.expiredAt
    );
  }
}

export { refreshToken };
