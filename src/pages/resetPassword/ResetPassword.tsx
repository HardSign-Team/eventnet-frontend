import "./ResetPassword.scss";
import React, { useState } from "react";
import { CustomInput } from "../../shared/CustomInput/CustomInput";
import CustomButton from "../../shared/CustomButton/CustomButton";
import { Gapped } from "@skbkontur/react-ui";
import { FormContainer } from "../../shared/FormContainer/FormContainer";
import {
  text,
  ValidationContainer,
  ValidationWrapper,
} from "@skbkontur/react-ui-validations";
import { container, refContainer, mailValidator } from "../../utils/Validators";
import { UserStore } from "../../stores/UserStore";

interface ResetPasswordProps {
  userStore: UserStore;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ userStore }) => {
  const [isMailEntered, setIsMailEntered] = useState(false);
  const [mail, setMail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [codeConfirm, setCodeConfirm] = useState("");

  const sendCodeToMail = async (): Promise<void> => {
    if (!container) {
      return;
    }
    if (await container.validate()) {
      setIsMailEntered(!isMailEntered);
    }
  };

  const validator = mailValidator({
    mail: mail,
  });

  return (
    <FormContainer className="resetPassword">
      {!isMailEntered && (
        <ValidationContainer ref={refContainer}>
          <FormContainer>
            <ValidationWrapper
              validationInfo={validator.getNode((x) => x.mail).get()}
              renderMessage={text("right")}
            >
              <CustomInput
                label="Введите адрес эл. почты"
                onChange={setMail}
                value={mail}
                type={"mail"}
              />
            </ValidationWrapper>
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
            На почту <a className="mail-send">{mail}</a>
          </p>
          <p className="mail-send-label second">отправлен код подтверждения</p>
          <Gapped vertical gap={7}>
            <CustomInput
              label="Введите код подтверждения"
              onChange={setCodeConfirm}
              value={codeConfirm}
            />
            <CustomInput
              type="password"
              label="Введите новый пароль"
              onChange={setNewPassword}
              value={newPassword}
            />
            <CustomInput
              label="Подтвердите пароль"
              type="password"
              onChange={setConfirmNewPassword}
              value={confirmNewPassword}
            />
            <CustomButton
              classNameDiv="button__resetPassword"
              label="Подтвердить"
            />
          </Gapped>{" "}
        </>
      )}
    </FormContainer>
  );
};
