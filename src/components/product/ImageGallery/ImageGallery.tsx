import React, { FC } from 'react';
import styles from './ImageGallery.module.scss';

interface ImageGalleryProps {
  images: string[];
  mainImage: string;
  handleImageClick: (image: string) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({
  images,
  mainImage,
  handleImageClick,
}) => {
  return (
    <div className={styles.gallery}>
      <div className={styles.list}>
        {images.map((image, id) => {
          const classes =
            image === mainImage
              ? [styles.activeImage, styles.image].join(' ')
              : styles.image;
          return (
            <div
              className={classes}
              key={id}
              onClick={() => handleImageClick(image)}
            >
              <img src={image} alt={`image${id}`} width={48} height={48} />
            </div>
          );
        })}
      </div>
      <div className={styles.mainImage}>
        <img src={mainImage} alt={`main image`} />
      </div>
    </div>
  );
};

export default ImageGallery;
