import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { confirmEmail } from "../../../api/auth/registration/confirmEmail";

export const CompletedRegister: React.FC = () => {
  const [params] = useSearchParams();
  const userId = params.get("userId");
  const confirmKey = params.get("code");

  const [isConfirmed, setIdConfirmed] = useState(false);

  useEffect(() => {
    if (userId !== null && confirmKey !== null) {
      confirmEmail(userId, encodeURIComponent(confirmKey)).then((x) => {
        if (x) setIdConfirmed(true);
      });
    }
  }, [userId, confirmKey]);

  return (
    <div className={styles.completedRegister}>
      <div className={styles.content}>
        {isConfirmed ? (
          <>
            <p>Поздравляем!</p>
            <p>Регистрация завершена </p>
          </>
        ) : (
          <p>Время действия ссылки истекло</p>
        )}
      </div>
    </div>
  );
};
