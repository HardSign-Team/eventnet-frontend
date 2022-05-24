import { autorun, makeAutoObservable } from "mobx";
import { loadLocalState, saveLocalState } from "../utils/StoragesUtils";
import { BASE_ROUTE } from "../api/utils";

export class UserStore {
  private accessToken: string = loadLocalState("accessToken", "");
  private expiredAt: string = loadLocalState("expiredAt", "");
  private refreshToken: string = loadLocalState("refreshToken", "");
  private userName: string = loadLocalState("userName", "");
  private email: string = loadLocalState("email", "");
  private userRoles: string[] = loadLocalState("userRoles", []);
  private isAuth: boolean = loadLocalState("isAuth", false);
  private image: string = loadLocalState("image", "");
  private birthDate: string = loadLocalState("birthDate", "");
  private gender: string = loadLocalState("gender", "");
  private id: string = loadLocalState("id", "");

  constructor() {
    makeAutoObservable(this, {});
  }

  public setId(id: string) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public setGender(gender: string) {
    this.gender = gender;
  }

  public getGender() {
    return this.gender;
  }

  public setBirthDate(birthDate: string) {
    this.birthDate = birthDate;
  }

  public getBirthDate() {
    return this.birthDate;
  }

  public setImage(image: string) {
    this.image = image;
  }

  public getImage(width: number = 512, height: number = 512) {
    if (this.image)
      return `${BASE_ROUTE}/${this.image}?width=${width}&height=${height}`;
    else return false;
  }

  public setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  public getIsAuth() {
    return this.isAuth;
  }

  public setUserRoles(userRoles: string[]) {
    this.userRoles = userRoles;
  }

  public getUserRoles() {
    return this.userRoles;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getEmail() {
    return this.email;
  }

  public setUserName(userName: string) {
    this.userName = userName;
  }

  public getUserName() {
    return this.userName;
  }

  public setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  public getRefreshToken() {
    return this.refreshToken;
  }

  public setExpiredAt(expiredAt: string) {
    this.expiredAt = expiredAt;
  }

  public getExpiredAt() {
    return this.expiredAt;
  }

  public getAccessToken() {
    return this.accessToken;
  }

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  public save() {
    autorun(() => {
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
      saveLocalState("id", this.id);
    });
  }

  public saveTokens(
    accessToken: string,
    refreshToken: string,
    expiredAt: string
  ) {
    autorun(() => {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.expiredAt = expiredAt;
      saveLocalState("accessToken", accessToken);
      saveLocalState("refreshToken", refreshToken);
      saveLocalState("expiredAt", expiredAt);
    });
  }

  public logout() {
    localStorage.clear();
    autorun(() => {
      this.isAuth = false;
      this.accessToken = "";
      this.email = "";
      this.refreshToken = "";
      this.userName = "";
      this.userRoles = [];
      this.id = "";
      this.image = "";
    });
  }
}
