import React from "react";
import { Modal } from "@skbkontur/react-ui";
import styles from "./PhotoModal.module.scss";

type PhotoModalProps = {
  image: string;
  onClose: () => void;
};

const PhotoModal: React.FC<PhotoModalProps> = ({ image, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <Modal.Body style={{ background: "#D7DCD7" }}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={image} alt={"picked"} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PhotoModal;
