import React from "react";
import { Modal } from "@skbkontur/react-ui";
import styles from "./index.module.scss";
import { EventSaveStatus } from "../../../api/events/getIsCreated";
import { LoadSpinner } from "../../../shared/LoadSpinner";
import cn from "classnames";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import { NavLink } from "react-router-dom";
import { getDefaultParams } from "../../../App";

type StatusModalProps = {
  status: EventSaveStatus;
  onClose: () => void;
};

export const StatusModal: React.FC<StatusModalProps> = ({
  status,
  onClose,
}) => {
  let text = "";
  let isError = false;
  let showLoader = false;

  switch (status) {
    case EventSaveStatus.Saved:
      text = "Событие успешно создано!";
      break;
    case EventSaveStatus.NotSavedDueToError:
      text =
        "Произошла ошибка! Проверьте, что все поля заполнены верно и попробуйте ещё раз.";
      isError = true;
      break;
    case EventSaveStatus.InProgress:
      showLoader = true;
      break;
    case EventSaveStatus.LongWaiting:
      text = "Долгое время ожидания от сервера.";
      isError = true;
      break;
  }

  return (
    <Modal onClose={onClose}>
      <Modal.Body>
        <div className={styles.modalWrapper}>
          {showLoader ? (
            <LoadSpinner />
          ) : (
            <p
              className={cn(
                styles.message,
                isError ? styles.error : styles.success
              )}
            >
              {text}
            </p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {status === EventSaveStatus.Saved && (
          <NavLink to={`/events?${getDefaultParams()}`}>
            <CustomButton label={"Вернуться на карту"} width={"100%"} />
          </NavLink>
        )}
      </Modal.Footer>
    </Modal>
  );
};
