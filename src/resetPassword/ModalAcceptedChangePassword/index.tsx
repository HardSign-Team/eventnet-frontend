import React from "react";
import styles from "./index.module.scss";
import { Modal } from "@skbkontur/react-ui";
import CustomButton from "../../shared/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";

export const ModalAcceptedChangePassword: React.FC = () => {
  const rout = useNavigate();
  const onClick = () => {
    rout("/login");
  };

  return (
    <Modal onClose={onClick} width={400}>
      <Modal.Header>Регистрация завершена</Modal.Header>
      <Modal.Body>
        <p>Пароль изменен!</p>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton onClick={onClick} label="Ok" />
      </Modal.Footer>
    </Modal>
  );
};
