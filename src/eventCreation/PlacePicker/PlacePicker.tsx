import React, { useState } from "react";
import styles from "./PlacePicker.module.scss";
import MapModal from "../MapModal/MapModal";

type PlacePickerProps = {
  coordinates: string;
  setCoordinates: (value: string) => void;
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

  const openMapModal = () => {
    setShowMapModal(true);
  };

  return (
    <>
      {showMapModal && <MapModal onClose={closeMapModal} />}
      <div className={styles.eventPlacePicker}>
        <span className={styles.eventPlacePicker__label}>Координаты</span>
        <input
          type="text"
          className={styles.eventPlacePicker__input}
          placeholder={"56.817076, 60.611855"}
          value={coordinates}
          onChange={(e) => setCoordinates(e.target.value)}
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
