import { genders } from "../shared/GenderSelector/GenderSelector";

interface User {}

interface RegistrationUserInfo {
  name: string;
  email: string;
  sex: genders;
  password: string;
  acceptedPassword: string;
  born: string;
}

interface LoginUserInfo {
  login: string;
  password: string;
}

export type { User, RegistrationUserInfo, LoginUserInfo };
