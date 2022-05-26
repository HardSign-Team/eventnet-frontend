import { BASE_ROUTE, HTTP_METHODS, STATUS_CODES } from "../../utils";
import globalStore from "../../../stores/GlobalStore";

async function refreshToken() {
  const response = await fetch(BASE_ROUTE + "/api/token/refresh-token", {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify({
      refreshToken: globalStore.userStore.getRefreshToken(),
    }),
  });

  if (response.status === STATUS_CODES.OK) {
    const answer = await response.json();
    const userStore = globalStore.userStore;
    userStore.saveTokens(
      answer.accessToken.tokenString,
      answer.refreshToken.tokenString,
      answer.accessToken.expiredAt,
      answer.refreshToken.expiredAt
    );
  } else globalStore.userStore.logout();
}

export { refreshToken };
