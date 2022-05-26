import { autorun, makeAutoObservable } from "mobx";
import { loadLocalState, saveLocalState } from "../utils/StoragesUtils";
import { BASE_ROUTE } from "../api/utils";
import avatar from "../assets/avatar.jpg";

export class UserStore {
  private accessToken: string = loadLocalState("accessToken", "");
  private expiredAtAccessToken: string = loadLocalState(
    "expiredAtAccessToken",
    ""
  );
  private expiredAtRefreshToken: string = loadLocalState(
    "expiredAtRefreshToken",
    ""
  );
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

  public setExpiredAtRefreshToken(expiredAtRefreshToken: string) {
    this.expiredAtRefreshToken = expiredAtRefreshToken;
  }

  public getExpiredAtRefreshToken() {
    return this.expiredAtRefreshToken;
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
    if (this.image !== "default-avatar.jpeg" && this.image !== "")
      return `${BASE_ROUTE}/${this.image}?width=${width}&height=${height}`;
    else return avatar;
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

  public setExpiredAtAccessToken(expiredAtAccessToken: string) {
    this.expiredAtAccessToken = expiredAtAccessToken;
  }

  public getExpiredAtAccessToken() {
    return this.expiredAtAccessToken;
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
      saveLocalState("expiredAtAccessToken", this.expiredAtAccessToken);
      saveLocalState("expiredAtRefreshToken", this.expiredAtRefreshToken);
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
    expiredAtAccessToken: string,
    expiredAtRefreshToken: string
  ) {
    autorun(() => {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.expiredAtAccessToken = expiredAtAccessToken;
      this.expiredAtRefreshToken = expiredAtRefreshToken;
      saveLocalState("accessToken", accessToken);
      saveLocalState("refreshToken", refreshToken);
      saveLocalState("expiredAtAccessToken", expiredAtAccessToken);
      saveLocalState("expiredAtRefreshToken", expiredAtRefreshToken);
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
      this.expiredAtAccessToken = "";
      this.expiredAtRefreshToken = "";
    });
  }
}
