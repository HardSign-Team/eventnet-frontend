import {Gender} from "./Gender";

export type RegisterModel = {
    userName: string;
    birthDate: Date;
    password: string;
    confirmPassword: string;
    email: string;
    gender: Gender;
}