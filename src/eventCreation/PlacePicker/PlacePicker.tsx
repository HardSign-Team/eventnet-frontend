import React from "react";
import styles from "./PlacePicker.module.scss";
import { Gapped } from "@skbkontur/react-ui";

type PlacePickerProps = {
  coordinates: string;
  setCoordinates: (value: string) => void;
  openModal: () => void;
};

//TODO маска на инпуте для координат
const PlacePicker: React.FC<PlacePickerProps> = ({
  coordinates,
  setCoordinates,
  openModal,
}) => {
  return (
    <Gapped gap={13} className={styles.eventPlacePicker}>
      <span className={styles.eventPlacePicker__label}>Координаты</span>
      <input
        type="text"
        className={styles.eventPlacePicker__input}
        placeholder={"56.817076, 60.611855"}
        value={coordinates}
        onChange={(e) => setCoordinates(e.target.value)}
      />
      <span onClick={openModal} className={styles.eventPlacePicker__mapLink}>
        выбрать на карте
      </span>
    </Gapped>
  );
};

export default PlacePicker;
