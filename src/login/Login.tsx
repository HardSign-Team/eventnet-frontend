import React, { useState } from "react";
import Logo from "../shared/Logo";
import "./Login.css";
import CustomButton from "../shared/CustomButton/CustomButton";
import { CustomInput } from "../shared/CustomInput/CustomInput";
import { FormContainer } from "../shared/FormContainer/FormContainer";
import { userInfo, loginRequest } from "../api/loginRequest";
import {
  text,
  ValidationContainer,
  ValidationWrapper,
} from "@skbkontur/react-ui-validations";
import { container, loginValidator, refContainer } from "../utils/Validators";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const login = async (): Promise<void> => {
    if (!container) {
      return;
    }
    if (await container.validate()) {
      const user: userInfo = { login: userName, password: password };
      console.log(user);
      loginRequest(user).then((x) => console.log(x));
    }
  };

  const checkLogin = () => {
    login();
  };

  const validator = loginValidator({
    login: userName,
    password: password,
  });

  return (
    <div className="login">
      <div className="logo-login">
        <Logo className="logo_dess" width={200} height={200} />
      </div>
      <ValidationContainer ref={refContainer}>
        <FormContainer>
          <ValidationWrapper
            validationInfo={validator.getNode((x) => x.login).get()}
            renderMessage={text("right")}
          >
            <CustomInput
              label="Эл. почта или имя пользователя"
              onChange={setUserName}
              value={userName}
            />
          </ValidationWrapper>
          {(errorPassword || errorName) && (
            <p className="Error">Неправильный логин или пароль</p>
          )}
          <ValidationWrapper
            renderMessage={text("right")}
            validationInfo={validator.getNode((x) => x.password).get()}
          >
            <CustomInput
              label="Пароль"
              onChange={setPassword}
              type="password"
              value={password}
            />
          </ValidationWrapper>
          <div className="password_handler">
            <div className="label_helpers_source">
              <a className="reset_password" href="../resetPassword">
                Забыли пароль?
              </a>
              <div className="remember_password">
                <input
                  id="checked"
                  type="checkbox"
                  className="checked_remember_password"
                />
                <label className="label_checked" htmlFor="checked">
                  Запомнить меня
                </label>
              </div>
            </div>
            <CustomButton
              label="Войти"
              className="login__button"
              onClick={() => checkLogin()}
              classNameDiv="label_login_button"
              width={190}
            />
          </div>
          <div className="change_to_registration">
            <a className="not_acc">Нет аккаунта?</a>
            <a className="change_rout_to_registration" href="/register">
              Зарегистрироваться
            </a>
          </div>
        </FormContainer>
      </ValidationContainer>
    </div>
  );
};

export default Login;
