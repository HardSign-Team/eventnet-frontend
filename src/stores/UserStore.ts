import { makeAutoObservable } from "mobx";
import { loadLocalState } from "../utils/StoragesUtils";

export class UserStore {
  public accessToken: string = "";
  public expiredAt: string = "";
  public refreshToken: string = loadLocalState("refreshToken", "");
  public userName: string = "";
  public email: string = loadLocalState("email", "");
  public userRoles: string[] = [];
  public isAuth: boolean = loadLocalState("isAuth", false);
  public image: string = "";
  public birthDate: string = "";
  public gender: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  public logout() {
    this.isAuth = false;
    this.accessToken = "";
    this.email = "";
    this.refreshToken = "";
    this.userName = "";
    this.userRoles = [];
  }
}
