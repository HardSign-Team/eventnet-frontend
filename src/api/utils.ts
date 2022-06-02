import { refreshToken } from "./auth/refreshToken";

export const BASE_ROUTE: string = "http://localhost:5203";

export const STATUS_CODES = {
  ACCEPTED: 202,
  OK: 200,
  BAD_REQUEST: 400,
};

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
};

export async function AuthorizedRequest(request: () => Promise<any>) {
  const response = await request();
  if (response.statusText === "Unauthorized") {
    await refreshToken();
    return await request();
  } else return response;
}
