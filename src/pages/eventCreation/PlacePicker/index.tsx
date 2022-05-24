import React, { useState } from "react";
import styles from "./index.module.scss";
import MapModal from "../MapModal";
import { Input } from "@skbkontur/react-ui";
import { Coordinates } from "../../../models/Coordinates";
import { formatCoordinates } from "../../../utils/coordinatesHelper";

type PlacePickerProps = {
  coordinates: string;
  setCoordinates: (value: string) => void;
  onClick?: () => void;
};

//TODO маска на инпуте для координат
const PlacePicker: React.FC<PlacePickerProps> = ({
  coordinates,
  setCoordinates,
}) => {
  const [showMapModal, setShowMapModal] = useState(false);
  const closeMapModal = () => {
    setShowMapModal(false);
  };

  const savePickedCoords = (pickedCoords: Coordinates | undefined) => {
    pickedCoords && setCoordinates(formatCoordinates(pickedCoords));
  };

  const openMapModal = () => {
    setShowMapModal(true);
  };

  return (
    <>
      {showMapModal && (
        <MapModal onClose={closeMapModal} saveNewCoords={savePickedCoords} />
      )}
      <div className={styles.eventPlacePicker}>
        <span className={styles.eventPlacePicker__label}>Координаты</span>
        <Input
          className={styles.eventPlacePicker__input}
          value={coordinates}
          onValueChange={(value) => setCoordinates(value)}
        />

        <span
          onClick={openMapModal}
          className={styles.eventPlacePicker__mapLink}
        >
          выбрать на карте
        </span>
      </div>
    </>
  );
};

export default PlacePicker;
