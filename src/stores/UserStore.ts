import { makeAutoObservable } from "mobx";

export class UserStore {
  public accessToken: string = "";
  public expiredAt: string = "";
  public refreshToken: string = "";
  public userName: string = "";
  public email: string = "";
  public userRoles: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}
