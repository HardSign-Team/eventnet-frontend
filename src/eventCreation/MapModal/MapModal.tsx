import React, { useState } from "react";
import { Modal } from "@skbkontur/react-ui";
import CustomButton from "../../shared/CustomButton/CustomButton";

type ShowMapModalProps = {
  onClose: () => void;
};

const MapModal: React.FC<ShowMapModalProps> = ({ onClose }) => {
  const saveCoords = () => {};

  return (
    <Modal onClose={onClose}>
      <Modal.Body>
        <div>bonanamama</div>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton
          onClick={saveCoords}
          label={"Сохранить место"}
          height={36}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default MapModal;
