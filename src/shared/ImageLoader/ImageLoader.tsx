import React, { Dispatch, SetStateAction } from "react";
import styles from "./ImageLoader.module.scss";
import Image from "../../models/Image";

type ImageLoaderProps = {
  setImages: Dispatch<SetStateAction<Image[]>>;
  withAdditionalLoading?: boolean;
  maxImagesCount?: number;
  labelText?: string;
  style?: {};
};

const DEFAULT_MAX_IMAGES_COUNT = 8;

const ImageLoader: React.FC<ImageLoaderProps> = ({
  withAdditionalLoading = true,
  labelText = "Загрузить фотографии...",
  style = {},
  setImages,
  maxImagesCount = DEFAULT_MAX_IMAGES_COUNT,
}) => {
  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const allowedExtensions = ["jpg", "jpeg", "png", "bmp"];

    const files = e.target.files;

    if (!files) return;

    const images: Image[] = [];

    for (let i = 0; i < Math.min(files.length, maxImagesCount); i++) {
      const file = files[i];
      const fileName = file.name;
      const dotIndex = fileName.lastIndexOf(".") + 1;
      const fileExtension = fileName
        .slice(dotIndex, fileName.length)
        .toLowerCase();
      allowedExtensions.includes(fileExtension) &&
        images.push({ url: URL.createObjectURL(file), file: file });
    }

    withAdditionalLoading
      ? setImages((prev) => [...prev, ...images].slice(0, maxImagesCount))
      : setImages(images);
  }

  return (
    <div className={styles.imageLoader} style={style}>
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
        {labelText}
      </label>
    </div>
  );
};
export default ImageLoader;
