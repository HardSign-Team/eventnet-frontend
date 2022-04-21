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
    const allowedExtensions = ["jpg", "jpeg", "png", "bmp"];
    const allowedImagesCount = 8;

    const files = e.target.files;

    if (!files) return;

    const images = [];

    for (let i = 0; i < Math.min(files.length, allowedImagesCount); i++) {
      const file = files[i];
      const fileName = file.name;
      const dotIndex = fileName.lastIndexOf(".") + 1;
      const fileExtension = fileName
        .slice(dotIndex, fileName.length)
        .toLowerCase();
      allowedExtensions.includes(fileExtension) && images.push(file);
    }

    setImageFiles(images);
  }

  return (
    <div className={styles.imageLoader}>
      <input
        className={styles.imageLoader__input}
        id={styles.imageLoader__input}
        type="file"
        multiple
        accept="image/png, image/bmp, image/jpeg"
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
