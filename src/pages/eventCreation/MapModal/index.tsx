import React, { useState } from "react";
import { Modal } from "@skbkontur/react-ui";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import YaMap from "../../events/YandexMap/YaMap";
import "./index.scss";

type ShowMapModalProps = {
  onClose: () => void;
};

const Index: React.FC<ShowMapModalProps> = ({ onClose }) => {
  const saveCoords = () => {};

  return (
    <Modal onClose={onClose}>
      <Modal.Body>
        <div className={"map-wrapper"}>
          <YaMap className={"modal-map"} />
        </div>
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

export default Index;
