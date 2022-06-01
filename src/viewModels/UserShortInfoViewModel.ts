import { guid } from "./Guid";

export interface UserShortInfoViewModel {
  id: guid;
  userName: string;
  email: string;
  gender: string;
  birthDate: string;
  avatarUrl: string;
}