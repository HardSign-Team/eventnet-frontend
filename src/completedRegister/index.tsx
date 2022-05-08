import styles from "./index.module.scss";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export const CompletedRegister: React.FC = () => {
  const { userId } = useParams();
  const { confirmKey } = useParams();
  const [isConfirmed, setIdConfirmed] = useState(true);
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
