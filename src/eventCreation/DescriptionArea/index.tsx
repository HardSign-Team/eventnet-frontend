import React from "react";
import { Gapped } from "@skbkontur/react-ui";
import styles from "./index.module.scss";

type DescriptionAreaProps = {
  eventDescription: string;
  updateEventDescription: (value: string) => void;
};

const DescriptionArea: React.FC<DescriptionAreaProps> = ({eventDescription, updateEventDescription}) => {
  return (
    <Gapped className={styles.eventDescription} gap={10} vertical>
      <div className={styles.eventDescription__label}>Описание:</div>
      <textarea
        className={styles.eventDescription__area}
        value={eventDescription}
        onChange={(e) => updateEventDescription(e.target.value)}
        placeholder={"Введите название..."}
      />
    </Gapped>
  );
};

export default DescriptionArea;
