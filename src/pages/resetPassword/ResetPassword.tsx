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
import { ModalAcceptedChangePassword } from "./ModalAcceptedChangePassword";
import { forgotPassword } from "../../api/auth/password/forgot";
import { resetPassword } from "../../api/auth/password/resetPassword";

export const ResetPassword: React.FC = () => {
  const [isMailEntered, setIsMailEntered] = useState(false);
  const [mail, setMail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isErrorCodeConfirm, setIsErrorCodeConfirm] = useState(false);
  const [isErrorExistMail, setIsErrorExistMail] = useState(false);
  const [codeConfirm, setCodeConfirm] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const sendCodeToMail = async (): Promise<void> => {
    setIsErrorExistMail(false);
    setIsErrorCodeConfirm(false);

    if (!container) {
      return;
    }

    if (await container.validate()) {
      if (await forgotPassword(mail)) setIsMailEntered(!isMailEntered);
      else setIsErrorExistMail(true);
    }
  };

  const acceptNewPassword = async () => {
    if (!container) return;

    if (await container.validate()) {
      if (
        await resetPassword(codeConfirm, mail, newPassword, confirmNewPassword)
      )
        setIsPasswordChanged(true);
      else setIsErrorCodeConfirm(true);
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
              <p className="resetPassword__error">???????????????????????? ???? ????????????????????</p>
            )}
            <ValidationWrapper
              validationInfo={mailValidatorUse.getNode((x) => x.mail).get()}
              renderMessage={text("right")}
            >
              <CustomInput
                label="?????????????? ?????????? ????. ??????????"
                onChange={setMail}
                value={mail}
                type={"mail"}
              />
            </ValidationWrapper>
            {isErrorCodeConfirm && (
              <p className="resetPassword__error">???????????????? ??????</p>
            )}
            <CustomButton
              classNameDiv="button__resetPassword"
              label="?????????????????? ??????"
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
            ???? ?????????? <p className="mail-send">{mail}</p>
          </p>
          <p className="mail-send-label second">?????????????????? ?????? ??????????????????????????</p>
          <ValidationContainer ref={refContainer}>
            <FormContainer>
              <CustomInput
                label="?????????????? ?????? ??????????????????????????"
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
                  label="?????????????? ?????????? ????????????"
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
                  label="?????????????????????? ????????????"
                  type="password"
                  onChange={setConfirmNewPassword}
                  value={confirmNewPassword}
                />
              </ValidationWrapper>
              <CustomButton
                classNameDiv="button__resetPassword"
                label="??????????????????????"
                onClick={acceptNewPassword}
              />
            </FormContainer>
          </ValidationContainer>{" "}
        </>
      )}
    </FormContainer>
  );
};
