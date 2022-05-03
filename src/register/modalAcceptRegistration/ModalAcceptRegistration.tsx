import styles from "./ModalAcceptRegistration.module.scss";
import React from "react";
import { Modal } from "@skbkontur/react-ui";
import CustomButton from "../../shared/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";

interface Props {
  readonly mail: string;
}

export const ModalAcceptRegistration: React.FC<Props> = ({ mail }) => {
  const rout = useNavigate();
  const onClick = () => {
    rout("/login");
  };
  return (
    <Modal onClose={onClick} width={600}>
      <Modal.Header>Регистрация завершена</Modal.Header>
      <Modal.Body>
        <p>Подтверждение отправлено на почту {mail}</p>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton onClick={onClick} label="Ok" />
      </Modal.Footer>
    </Modal>
  );
};
