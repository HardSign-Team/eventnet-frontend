import React, {
  MouseEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./PhotoCarousel.module.scss";
import PhotoModal from "../Modal/PhotoModal";
import arrowLeft from "../../../assets/arrow_left.svg";
import arrowRight from "../../../assets/arrow_right.svg";
import ImageLoader from "../../ImageLoader/ImageLoader";
import Image from "../../../models/Image";
import deleteIcon from "../../../assets/delete.svg";

type PhotoCarouselProps = {
  images: Image[];
  withLoader?: {
    setImages: Dispatch<SetStateAction<Image[]>>;
    withAdditionalLoading?: boolean;
  };
};

const MAX_IMAGES_COUNT = 10;

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({
  withLoader,
  images,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [pickedImage, setPickedImage] = useState("");

  const carousel = useRef<Slider | null>(null);

  const openModal = (imgSrc: string) => {
    setPickedImage(imgSrc);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteImage = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    image: Image
  ) => {
    e.stopPropagation();
    withLoader?.setImages((prev) => prev.filter((x) => x !== image));
  };

  let settings = {
    dots: true,
    arrows: false,
    draggable: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {showModal && <PhotoModal image={pickedImage} onClose={closeModal} />}
      <div className={styles.wrapper}>
        {images.length > 0 && (
          <>
            <button
              className={styles.arrowPrev}
              onClick={() => carousel?.current?.slickPrev()}
            >
              <img src={arrowLeft} alt={"arrow left"} />
            </button>
            <button
              className={styles.arrowNext}
              onClick={() => carousel?.current?.slickNext()}
            >
              <img src={arrowRight} alt={"arrow right"} />
            </button>
          </>
        )}
        <Slider className={styles.photoCarousel} {...settings} ref={carousel}>
          {images.map((image) => (
            <div
              className={styles.photoCarousel__imageWrapper}
              key={image.url}
              onClick={() => openModal(image.url)}
            >
              {withLoader && (
                <button
                  className={styles.photoCarousel__deleteImageButton}
                  onClick={(e) => deleteImage(e, image)}
                >
                  <img
                    src={deleteIcon}
                    width={"20px"}
                    height={"20px"}
                    alt="delete icon"
                  />
                </button>
              )}
              <img
                className={styles.photoCarousel__image}
                src={image.url}
                alt={"event"}
              />
            </div>
          ))}
          {images.length < MAX_IMAGES_COUNT && (
            <div className={styles.photoCarousel__imageWrapper}>
              {withLoader && (
                <ImageLoader
                  setImages={withLoader.setImages}
                  withAdditionalLoading={withLoader?.withAdditionalLoading}
                  maxImagesCount={MAX_IMAGES_COUNT}
                />
              )}
            </div>
          )}
        </Slider>
      </div>
    </>
  );
};

export default PhotoCarousel;
