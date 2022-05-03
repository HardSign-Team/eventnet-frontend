import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./PhotoCarousel.module.scss";
import PhotoModal from "../Modal/PhotoModal";
import arrowLeft from "../../../assets/arrow_left.svg";
import arrowRight from "../../../assets/arrow_right.svg";
import ImageLoader from "../../ImageLoader/ImageLoader";

type PhotoCarouselProps = {
  withLoader?: boolean;
  images: string[];
  setImages: (images: string[]) => void;
};

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({
  withLoader = false,
  images,
  setImages,
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
        <button
          className={styles.arrowPrev}
          onClick={() => carousel?.current?.slickPrev()}
        >
          <img src={arrowLeft} alt={"arrow"} />
        </button>
        <button
          className={styles.arrowNext}
          onClick={() => carousel?.current?.slickNext()}
        >
          <img src={arrowRight} alt={"arrow"} />
        </button>
        <Slider className={styles.photoCarousel} {...settings} ref={carousel}>
          {images.length !== 0 ? (
            images.map((imageSrc) => (
              <div
                className={styles.photoCarousel__imageWrapper}
                key={imageSrc}
                onClick={() => openModal(imageSrc)}
              >
                <img
                  className={styles.photoCarousel__image}
                  src={imageSrc}
                  alt={"event"}
                />
              </div>
            ))
          ) : (
            <div className={styles.photoCarousel__imageWrapper}>
              {withLoader && <ImageLoader setImageURLS={setImages} />}
            </div>
          )}
        </Slider>
      </div>
    </>
  );
};

export default PhotoCarousel;
