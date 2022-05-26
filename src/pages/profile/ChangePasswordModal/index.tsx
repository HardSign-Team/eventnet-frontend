import React, { useState } from "react";
import { Modal } from "@skbkontur/react-ui";
import { CustomInput } from "../../../shared/CustomInput/CustomInput";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import styles from "./index.module.scss";
import { FormContainer } from "../../../shared/FormContainer/FormContainer";
import {
  container,
  refContainer,
  changePasswordValidator,
} from "../../../utils/Validators";
import {
  ValidationContainer,
  ValidationWrapper,
} from "@skbkontur/react-ui-validations";
import { changePassword } from "../../../api/auth/password/changePassword";

type ChangePasswordModalProps = {
  onClose: () => void;
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  onClose,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);

  const validator = changePasswordValidator({
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmNewPassword: confirmNewPassword,
  });

  const savePassword = async () => {
    if (!container) {
      return;
    }
    if (
      (await container.validate()) &&
      (await changePassword(oldPassword, newPassword))
    )
      setIsAccepted(true);
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Header>Изменение пароля</Modal.Header>
      <Modal.Body>
        <ValidationContainer ref={refContainer}>
          <FormContainer>
            <ValidationWrapper
              validationInfo={validator.getNode((x) => x.oldPassword).get()}
            >
              <CustomInput
                type={"password"}
                label="Старый пароль"
                onChange={setOldPassword}
                value={oldPassword}
              />
            </ValidationWrapper>
            <ValidationWrapper
              validationInfo={validator.getNode((x) => x.newPassword).get()}
            >
              <CustomInput
                type={"password"}
                label="Новый пароль"
                onChange={setNewPassword}
                value={newPassword}
              />
            </ValidationWrapper>
            <ValidationWrapper
              validationInfo={validator.getNode((x) => x).get()}
            >
              <CustomInput
                type={"password"}
                label="Повтор пароля"
                onChange={setConfirmNewPassword}
                value={confirmNewPassword}
              />
            </ValidationWrapper>
          </FormContainer>
        </ValidationContainer>
      </Modal.Body>
      <Modal.Footer>
        {isAccepted && <p className={styles.message}>Успешно</p>}
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
