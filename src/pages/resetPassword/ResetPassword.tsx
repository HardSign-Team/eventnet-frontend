import "./ResetPassword.scss";
import React, { useState } from "react";
import { CustomInput } from "../../shared/CustomInput/CustomInput";
import CustomButton from "../../shared/CustomButton/CustomButton";
import { FormContainer } from "../../shared/FormContainer/FormContainer";
import {
  text,
  ValidationContainer,
  ValidationWrapper,
} from "@skbkontur/react-ui-validations";
import {
  container,
  refContainer,
  mailValidator,
  resetPasswordValidator,
} from "../../utils/Validators";
import { UserStore } from "../../stores/UserStore";
import { ModalAcceptedChangePassword } from "./ModalAcceptedChangePassword";

interface ResetPasswordProps {
  userStore: UserStore;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ userStore }) => {
  const [isMailEntered, setIsMailEntered] = useState(false);
  const [mail, setMail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [enteredCodeConfirm, setEnteredCodeConfirm] = useState("");
  const [isErrorCodeConfirm, setIsErrorCodeConfirm] = useState(false);
  const [isErrorExistMail, setIsErrorExistMail] = useState(false);
  const [codeConfirm, setCodeConfirm] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const sendCodeToMail = async (): Promise<void> => {
    if (!container) {
      return;
    }
    if (await container.validate()) {
      // TODO проверка почты на существование
      setIsMailEntered(!isMailEntered);
      // TODO вызов функции запроса на беке
    }
  };

  const acceptNewPassword = async (): Promise<void> => {
    if (codeConfirm !== enteredCodeConfirm) {
      setIsErrorCodeConfirm(true);
      return;
    }
    if (!container) return;
    if (await container.validate()) {
      //TODO запрос на бек замены пароля

      setIsPasswordChanged(true);
    }
  };

  const mailValidatorUse = mailValidator({
    mail: mail,
  });

  const resetPasswordValidatorUse = resetPasswordValidator({
    password: newPassword,
    confirmPassword: confirmNewPassword,
  });

  return (
    <FormContainer className="resetPassword">
      {isPasswordChanged && <ModalAcceptedChangePassword />}
      {!isMailEntered && (
        <ValidationContainer ref={refContainer}>
          <FormContainer>
            {isErrorExistMail && (
              <p className="resetPassword__error">Пользователя не существует</p>
            )}
            <ValidationWrapper
              validationInfo={mailValidatorUse.getNode((x) => x.mail).get()}
              renderMessage={text("right")}
            >
              <CustomInput
                label="Введите адрес эл. почты"
                onChange={setMail}
                value={mail}
                type={"mail"}
              />
            </ValidationWrapper>
            {isErrorCodeConfirm && (
              <p className="resetPassword__error">Неверный код</p>
            )}
            <CustomButton
              classNameDiv="button__resetPassword"
              label="Отправить код"
              onClick={sendCodeToMail}
            />
          </FormContainer>
        </ValidationContainer>
      )}
      {isMailEntered && (
        <>
          {" "}
          <p className="mail-send-label first">
            {" "}
            На почту <p className="mail-send">{mail}</p>
          </p>
          <p className="mail-send-label second">отправлен код подтверждения</p>
          <ValidationContainer ref={refContainer}>
            <FormContainer>
              <CustomInput
                label="Введите код подтверждения"
                onChange={setCodeConfirm}
                value={codeConfirm}
              />
              <ValidationWrapper
                validationInfo={resetPasswordValidatorUse
                  .getNode((x) => x.password)
                  .get()}
                renderMessage={text("right")}
              >
                <CustomInput
                  type="password"
                  label="Введите новый пароль"
                  onChange={setNewPassword}
                  value={newPassword}
                />
              </ValidationWrapper>
              <ValidationWrapper
                validationInfo={resetPasswordValidatorUse
                  .getNode((x) => x.confirmPassword)
                  .get()}
                renderMessage={text("right")}
              >
                <CustomInput
                  label="Подтвердите пароль"
                  type="password"
                  onChange={setConfirmNewPassword}
                  value={confirmNewPassword}
                />
              </ValidationWrapper>
              <CustomButton
                classNameDiv="button__resetPassword"
                label="Подтвердить"
                onClick={acceptNewPassword}
              />
            </FormContainer>
          </ValidationContainer>{" "}
        </>
      )}
    </FormContainer>
  );
};
