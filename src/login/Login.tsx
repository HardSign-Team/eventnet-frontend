import React, { useState } from "react";
import Logo from "../shared/Logo";
import { Gapped, Input, PasswordInput } from "@skbkontur/react-ui";
import "./Login.css";
import CustomButton from "../shared/CustomButton";
import { CustomInput } from "../shared/CustomInput";

type userInfo = {
  login: string;
  password: string;
};

type errors = {
  name: string;
  password: string;
};

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", password: "" });
  const [errorName, setErrorName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const login = () => {
    console.log("login");
  };

  const checkLogin = (userName: string, password: string) => {
    const user: userInfo = { login: userName, password: password };
    fetch(" https://localhost:7203/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setUserInfo(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="login">
      <div className="logo-login">
        <Logo className="logo_dess" width={200} height={200} />
      </div>
      <Gapped gap={7} vertical>
        <CustomInput
          label="Эл. Почта или имя пользователя"
          onChange={setUserName}
        />
        {(errorPassword || errorName) && (
          <p className="Error">Неправильный логин или пароль</p>
        )}
        <CustomInput label="Пароль" onChange={setPassword} type="password" />
        <div className="password_handler">
          <div className="label_helpers_source">
            <a className="reset_password" href="../resetPassword">
              Забыли пароль?
            </a>
            <br />
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
            onClick={() => checkLogin(userName, password)}
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
      </Gapped>
    </div>
  );
};

export default Login;