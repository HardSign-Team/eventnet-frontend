import {
  createValidator,
  ValidationContainer,
} from "@skbkontur/react-ui-validations";
import { LoginUserInfo, RegistrationUserInfo } from "../models/User";
import { Nullable } from "@skbkontur/react-ui-validations/typings/Types";

const registrationValidator = createValidator<RegistrationUserInfo>((b) => {
  b.prop(
    (x) => x.name,
    (b) => {
      b.invalid((x) => !x, "Укажите имя", "submit");
    }
  );
  b.prop(
    (x) => x.email,
    (b) => {
      b.invalid((x) => !x, "Укажите адрес почты", "submit");
      b.invalid(
        (x) => !/^[a-z]+@[a-z]+\.[a-z]{2,}$/.test(x),
        "Неверный адрес почты"
      );
    }
  );
  b.prop(
    (x) => x.phone,
    (b) => {
      b.invalid((x) => !x, "Укажите телефон", "submit");
      b.invalid(
        (x) => !/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(x),
        "Неверный номер телефона"
      );
    }
  );
  b.prop(
    (x) => x.sex,
    (b) => {
      b.invalid((x) => !x, "Укажите пол", "submit");
    }
  );
  b.prop(
    (x) => x.born,
    (b) => {
      b.invalid((x) => !x, "Укажите дату рождения", "submit");
    }
  );
  b.prop(
    (x) => x.password,
    (b) => {
      b.invalid((x) => !x, "Придумайте пароль", "submit");
    }
  );
  b.prop(
    (x) => x,
    (b, password) => {
      b.invalid(
        (x) => x.acceptedPassword !== password.password,
        "Пароли не совпадают",
        "submit"
      );
    }
  );
});

const loginValidator = createValidator<LoginUserInfo>((b) => {
  b.prop(
    (x) => x.login,
    (b) => {
      b.invalid((x) => !x, "Введите логин или почту", "submit");
    }
  );
  b.prop(
    (x) => x.password,
    (b) => {
      b.invalid((x) => !x, "Введите пароль", "submit");
    }
  );
});

let container: Nullable<ValidationContainer> = null;
const refContainer = (el: Nullable<ValidationContainer>) => (container = el);

export { registrationValidator, loginValidator, container, refContainer };
