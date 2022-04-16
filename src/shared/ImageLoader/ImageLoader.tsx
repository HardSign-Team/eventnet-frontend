import React, { useState, useEffect } from "react";
import styles from "./ImageLoader.module.scss";

type ImageLoaderProps = {
  setImageURLS: (urls: string[]) => void;
};

const ImageLoader: React.FC<ImageLoaderProps> = ({ setImageURLS }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    if (imageFiles.length < 1) return;
    const newImageUrls: string[] = [];
    imageFiles.forEach((image) =>
      newImageUrls.push(URL.createObjectURL(image))
    );
    setImageURLS(newImageUrls);
  }, [imageFiles]);

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    const images = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        images.push(files[i]);
      }
    }
    files && setImageFiles(images);
  }

  return (
    <div className={styles.imageLoader}>
      <input
        className={styles.imageLoader__input}
        id={styles.imageLoader__input}
        type="file"
        multiple
        accept="image/*"
        onChange={onImageChange}
      />
      <label
        className={styles.imageLoader__label}
        htmlFor={styles.imageLoader__input}
      >
        Загрузить фотографии...
      </label>
    </div>
  );
};

export default ImageLoader;
