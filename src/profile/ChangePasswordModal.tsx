import React, { useState } from "react";
import { Gapped, Modal } from "@skbkontur/react-ui";
import { CustomInput } from "../shared/CustomInput/CustomInput";
import CustomButton from "../shared/CustomButton/CustomButton";
import "./ChangePasswordModal.scss";

enum PasswordTypes {
  Old,
  New,
  Repeated,
}

type ChangePasswordModalProps = {
  onClose: () => void;
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  onClose,
}) => {
  const userPassword = "jopabonana";

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [showEmptyInputMessage, setShowEmptyInputMessage] = useState(false);
  const [showInvalidOldPassMessage, setShowInvalidOldPassMessage] =
    useState(false);
  const [showNewPassMismatchMessage, setShowNewPassMismatchMessage] =
    useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const clearMessages = () => {
    setShowEmptyInputMessage(false);
    setShowInvalidOldPassMessage(false);
    setShowNewPassMismatchMessage(false);
    setShowSuccessMessage(false);
  };

  const updatePasswordState = (passwordType: PasswordTypes, value: string) => {
    clearMessages();
    switch (passwordType) {
      case PasswordTypes.Old:
        setOldPassword(value);
        break;
      case PasswordTypes.New:
        setNewPassword(value);
        break;
      case PasswordTypes.Repeated:
        setRepeatedPassword(value);
        break;
      default:
        console.log("invalid password type");
    }
  };

  const validateEmptyInput = () => {
    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      repeatedPassword.length === 0
    ) {
      setShowEmptyInputMessage(true);
      return false;
    }
    return true;
  };

  const savePassword = () => {
    if (!validateEmptyInput()) return;

    if (userPassword !== oldPassword) setShowInvalidOldPassMessage(true);
    else if (newPassword !== repeatedPassword)
      setShowNewPassMismatchMessage(true);
    else {
      //TODO дописать логику изменения пароля
      setShowSuccessMessage(true);
    }
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Header>Изменение пароля</Modal.Header>
      <Modal.Body>
        <Gapped vertical gap={7}>
          <CustomInput
            type={"password"}
            label="Старый пароль"
            onChange={(value) => updatePasswordState(PasswordTypes.Old, value)}
          />
          {showInvalidOldPassMessage && (
            <p className={"error-message"}>Неверный пароль</p>
          )}
          <CustomInput
            type={"password"}
            label="Новый пароль"
            onChange={(value) => updatePasswordState(PasswordTypes.New, value)}
          />
          <CustomInput
            type={"password"}
            label="Повтор пароля"
            onChange={(value) =>
              updatePasswordState(PasswordTypes.Repeated, value)
            }
          />
          {showEmptyInputMessage && (
            <p className={"error-message"}>Пустые поля ввода</p>
          )}
          {showNewPassMismatchMessage && (
            <p className={"error-message"}>Пароли не совпадают</p>
          )}
          {showSuccessMessage && (
            <p className={"success-message"}>Пароль успешно изменён</p>
          )}
        </Gapped>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton
          onClick={savePassword}
          classNameDiv={"save-password_button"}
          label={"Сохранить"}
          height={36}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
