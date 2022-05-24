import React, { useState } from "react";
import Logo from "../../shared/Logo/Logo";
import "./Login.css";
import CustomButton from "../../shared/CustomButton/CustomButton";
import { CustomInput } from "../../shared/CustomInput/CustomInput";
import { FormContainer } from "../../shared/FormContainer/FormContainer";
import { userInfo, loginRequest } from "../../api/auth/loginRequest";
import {
  text,
  ValidationContainer,
  ValidationWrapper,
} from "@skbkontur/react-ui-validations";
import {
  container,
  loginValidator,
  refContainer,
} from "../../utils/Validators";
import { UserStore } from "../../stores/UserStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { STATUS_CODES } from "../../api/utils";

interface LoginProps {
  userStore: UserStore;
}

export const Login: React.FC<LoginProps> = observer(({ userStore }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [saveLogin, setSaveLogin] = useState(true);

  const navigate = useNavigate();

  const login = async (): Promise<void> => {
    if (!container) {
      return;
    }
    if (await container.validate()) {
      const user: userInfo = { login: userName, password: password };
      await executeLoginRequest(user);
    }
  };

  const saveUserStore = (answer: any) => {
    const tokens = answer.tokens;
    userStore.setAccessToken(tokens.accessToken);
    userStore.setRefreshToken(tokens.refreshToken);
    userStore.setExpiredAt(tokens.expiredAt);
    const user = answer.user;
    userStore.setEmail(user.email);
    userStore.setUserName(user.userName);
    userStore.setBirthDate(user.birthDate);
    userStore.setGender(user.gender);
    userStore.setUserRoles(answer.userRoles);
    userStore.setIsAuth(true);
    userStore.setId(user.id);
    if (saveLogin) userStore.save();
  };

  const executeLoginRequest = async (user: userInfo) => {
    setError(false);
    const response = await loginRequest(user);
    if (response.status === STATUS_CODES.OK) {
      const answer = await response.json();
      saveUserStore(answer);
      navigate("/");
    } else setError(true);
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
          >
            <CustomInput
              label="Эл. почта или имя пользователя"
              onChange={setUserName}
              value={userName}
            />
          </ValidationWrapper>
          {error && <p className="error">Неправильный логин или пароль</p>}
          <ValidationWrapper
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
              <a className="reset_password" href="/reset-password">
                Забыли пароль?
              </a>
              <div className="remember_password">
                <input
                  id="checked"
                  type="checkbox"
                  className="checked_remember_password"
                  onChange={() => setSaveLogin(!saveLogin)}
                  checked={saveLogin}
                />
                <label className="label_checked" htmlFor="checked">
                  Запомнить меня
                </label>
              </div>
            </div>
            <CustomButton
              label="Войти"
              className="login__button"
              onClick={() => login()}
              classNameDiv="label_login_button"
              width={190}
            />
          </div>
          <div className="change_to_registration">
            <p className="not_acc">Нет аккаунта?</p>
            <a className="change_rout_to_registration" href="/register">
              Зарегистрироваться
            </a>
          </div>
        </FormContainer>
      </ValidationContainer>
    </div>
  );
});
