import { makeAutoObservable } from "mobx";
import { loadLocalState, saveLocalState } from "../utils/StoragesUtils";

export class UserStore {
  public accessToken: string = loadLocalState("accessToken", "");
  public expiredAt: string = loadLocalState("expiredAt", "");
  public refreshToken: string = loadLocalState("refreshToken", "");
  public userName: string = loadLocalState("userName", "");
  public email: string = loadLocalState("email", "");
  public userRoles: string[] = loadLocalState("userRoles", []);
  public isAuth: boolean = loadLocalState("isAuth", false);
  public image: string = loadLocalState("image", "");
  public birthDate: string = loadLocalState("birthDate", "");
  public gender: string = loadLocalState("gender", "");

  constructor() {
    makeAutoObservable(this, {});
  }

  public save() {
    saveLocalState("accessToken", this.accessToken);
    saveLocalState("expiredAt", this.expiredAt);
    saveLocalState("refreshToken", this.refreshToken);
    saveLocalState("userName", this.userName);
    saveLocalState("email", this.email);
    saveLocalState("userRoles", this.userRoles);
    saveLocalState("isAuth", this.isAuth);
    saveLocalState("image", this.image);
    saveLocalState("birthDate", this.birthDate);
    saveLocalState("gender", this.gender);
  }

  public saveTokens(accessToken: string, refreshToken: string) {
    saveLocalState("accessToken", accessToken);
    saveLocalState("refreshToken", refreshToken);
  }

  public logout() {
    localStorage.clear();
    this.isAuth = false;
    this.accessToken = "";
    this.email = "";
    this.refreshToken = "";
    this.userName = "";
    this.userRoles = [];
  }
}
