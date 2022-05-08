import styles from "./ModalAcceptRegistration.module.scss";
import React, { useState } from "react";
import { Modal } from "@skbkontur/react-ui";
import CustomButton from "../../shared/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { sendAgainEmailConfirmed } from "../../api/auth/registration/sendAgainEmailConfirmed";
import { SUCCESS } from "../../api/requestResponseCodes";

interface Props {
  readonly mail: string;
  readonly userName: string;
}

export const ModalAcceptRegistration: React.FC<Props> = ({
  mail,
  userName,
}) => {
  const navigate = useNavigate();
  const [isErrorSendRequest, setIsErrorSendRequest] = useState(false);

  const onClick = () => {
    navigate("/login");
  };

  const sendAgain = () => {
    setIsErrorSendRequest(false);
    sendAgainEmailConfirmed(userName).then((x) => {
      if (x.code !== SUCCESS) {
        setIsErrorSendRequest(true);
      }
    });
  };

  return (
    <Modal onClose={onClick} width={400}>
      <Modal.Header>Регистрация завершена</Modal.Header>
      <Modal.Body className={styles.modalAcceptRegistration}>
        <p>Подтверждение отправлено на почту {mail}</p>
        {isErrorSendRequest && (
          <p className={styles.error}>Ошибка при отправке сообщения</p>
        )}
        <p className={styles.sendAgain} onClick={sendAgain}>
          {" "}
          Отправить еще раз
        </p>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton onClick={onClick} label="Ok" />
      </Modal.Footer>
    </Modal>
  );
};
