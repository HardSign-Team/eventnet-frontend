import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./PhotoCarousel.module.scss";
import PhotoModal from "../Modal/PhotoModal";
import arrowLeft from "../../../assets/arrow_left.svg";
import arrowRight from "../../../assets/arrow_right.svg";
import ImageLoader from "../../ImageLoader/ImageLoader";
import Image from "../../../models/Image";

type PhotoCarouselProps = {
  images: Image[];
  withLoader?: { setImages: (images: Image[]) => void };
};

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
        {images.length > 1 && (
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
          {images.length !== 0 ? (
            images.map((image) => (
              <div
                className={styles.photoCarousel__imageWrapper}
                key={image.url}
                onClick={() => openModal(image.url)}
              >
                <img
                  className={styles.photoCarousel__image}
                  src={image.url}
                  alt={"event"}
                />
              </div>
            ))
          ) : (
            <div className={styles.photoCarousel__imageWrapper}>
              {withLoader && <ImageLoader setImages={withLoader.setImages} />}
            </div>
          )}
        </Slider>
      </div>
    </>
  );
};

export default PhotoCarousel;
