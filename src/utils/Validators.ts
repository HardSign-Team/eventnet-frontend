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
      b.invalid(
        (x) => !/^[0-9A-Za-z,.'!\\-]{3,}$/.test(x),
        "Неккоректное имя пользователя",
        "submit"
      );
    }
  );
  b.prop(
    (x) => x.email,
    (b) => {
      b.invalid((x) => !x, "Укажите адрес почты", "submit");
      b.invalid(
        (x) => !/^[A-Za-z.0-9]+@[a-z]+\.[a-z]{2,}$/.test(x),
        "Неверный адрес почты"
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
      b.invalid((x) => !x.acceptedPassword, "Подтвердите пароль", "submit");
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

const mailValidator = createValidator<{ mail: string }>((b) => {
  b.prop(
    (x) => x.mail,
    (b) => {
      b.invalid((x) => !x, "Укажите адрес почты", "submit");
      b.invalid(
        (x) => !/^[A-Za-z.0-9]+@[a-z]+\.[a-z]{2,}$/.test(x),
        "Неверный адрес почты"
      );
    }
  );
});

const resetPasswordValidator = createValidator<{
  password: string;
  confirmPassword: string;
}>((b) => {
  b.prop(
    (x) => x.password,
    (b) => {
      b.invalid((x) => !x, "Придумайте пароль", "submit");
    }
  );
  b.prop(
    (x) => x,
    (b, password) => {
      b.invalid((x) => !x.confirmPassword, "Подтвердите пароль", "submit");
      b.invalid(
        (x) => x.confirmPassword !== password.password,
        "Пароли не совпадают",
        "submit"
      );
    }
  );
});

const changePasswordValidator = createValidator<{
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}>((b) => {
  b.prop(
    (x) => x.oldPassword,
    (b) => {
      b.invalid((x) => !x, "Введите пароль", "submit");
    }
  );
  b.prop(
    (x) => x.newPassword,
    (b) => {
      b.invalid((x) => !x, "Введите пароль", "submit");
    }
  );
  b.prop(
    (x) => x,
    (b, password) => {
      b.invalid((x) => !x.confirmNewPassword, "Подтвердите пароль", "submit");
      b.invalid(
        (x) => x.confirmNewPassword !== password.newPassword,
        "Пароли не совпадают",
        "submit"
      );
    }
  );
});

let container: Nullable<ValidationContainer> = null;
const refContainer = (el: Nullable<ValidationContainer>) => (container = el);

export {
  registrationValidator,
  loginValidator,
  container,
  refContainer,
  mailValidator,
  resetPasswordValidator,
  changePasswordValidator,
};
