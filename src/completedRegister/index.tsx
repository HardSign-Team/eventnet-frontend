import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { confirmEmail } from "../api/auth/registration/confirmEmail";
import { SUCCESS } from "../api/requestResponseCodes";

export const CompletedRegister: React.FC = () => {
  const { userId } = useParams();
  const { confirmKey } = useParams();
  const [isConfirmed, setIdConfirmed] = useState(true);
  useEffect(() => {
    if (userId !== undefined && confirmKey !== undefined)
      confirmEmail(userId, decodeURI(confirmKey)).then((x) => {
        if (x.code === SUCCESS) setIdConfirmed(true);
      });
  }, [userId, confirmKey]);
  return (
    <div className={styles.completedRegister}>
      <div className={styles.content}>
        {isConfirmed ? (
          <>
            <p>Поздравляем!</p>
            <p>Регистарция подтверждена </p>
          </>
        ) : (
          <p>Время действия ссылки истекло</p>
        )}
      </div>
    </div>
  );
};
