import React, { FC, useState } from 'react';
import { IProduct } from '../../../types/products';
import styles from './Product.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';

const Product: FC<IProduct> = ({
  title,
  images,
  description,
  price,
  rating,
  brand,
  category,
  discountPercentage,
  stock,
}) => {
  const [mainImage, setMainImage] = useState<string>(images[0]);
  const [count, setCount] = useState<number>(0);

  const handleImageClick = (image: string): void => {
    setMainImage(image);
  };
  const starWidth = ((rating / 5) * 100).toString() + '%';

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h1>{title}</h1>
        <div className={styles.ratingWrapper}>
          <div className={styles.rating}>
            <div className={styles.stars}></div>
            <div
              className={styles.ratingStar}
              style={{ width: starWidth }}
            ></div>
          </div>
          <div>{rating}</div>
        </div>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.content}>
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
        <div className={styles.paragraphList}>
          <p className={styles.paragraph}>
            <h4 className={styles.descriptionTitle}>Описание : </h4>
            <span className={styles.description}>{description}</span>
          </p>
          <p className={styles.paragraph}>
            <h4 className={styles.descriptionTitle}>Бренд : </h4>
            <span className={styles.description}>{brand}</span>
          </p>
          <p className={styles.paragraph}>
            <h4 className={styles.name}>Категория : </h4>
            <span className={styles.description}>{category}</span>
          </p>
        </div>
        <div className={styles.priceBlock}>
          <div className={styles.priceWrapper}>
            <div className={styles.prices}>
              <div className={styles.price}>{price} $</div>
              <div className={styles.secondPrice}>
                {Math.ceil(price * (1 + discountPercentage / 100))} $
              </div>
              <div className={styles.discount}>
                -{Math.ceil(discountPercentage)}%
              </div>
            </div>
            <div className={styles.stock}>{`Осталось: ${
              stock - count
            } шт.`}</div>
            <button
              onClick={() => setCount(count + 1)}
              className={styles.button}
            >
              {count === 0 ? (
                'В корзину'
              ) : (
                <>
                  <AiOutlinePlus />
                  <i>{count} шт.</i>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
