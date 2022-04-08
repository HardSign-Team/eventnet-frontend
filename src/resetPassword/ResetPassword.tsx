import "./ResetPassword.scss";
import React, { useState } from "react";
import { CustomInput } from "../shared/CustomInput/CustomInput";
import CustomButton from "../shared/CustomButton/CustomButton";
import { Gapped } from "@skbkontur/react-ui";

export const ResetPassword: React.FC = () => {
  const [isMailEntered, setIsMailEntered] = useState(false);
  const [mail, setMail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [codeConfirm, setCodeConfirm] = useState("");

  const sendCodeToMail = () => {
    setIsMailEntered(!isMailEntered);
  };
  return (
    <Gapped vertical gap={7} className="resetPassword">
      {!isMailEntered && (
        <Gapped vertical gap={7}>
          <CustomInput
            label="Введите адрес эл. почты"
            onChange={setMail}
            value={mail}
            type={"mail"}
          />
          <CustomButton
            classNameDiv="button__resetPassword"
            label="Отправить код"
            onClick={sendCodeToMail}
          />
        </Gapped>
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
    </Gapped>
  );
};
