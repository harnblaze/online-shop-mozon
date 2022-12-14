import React, { FC, useState } from 'react';
import { IProduct } from '../../../types/products';
import styles from './ProductItem.module.scss';
import { AiFillStar, AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface IProductProps {
  product: IProduct;
}

const ProductItem: FC<IProductProps> = ({ product }) => {
  const { id, thumbnail, title, price, discountPercentage, rating } = product;
  const [count, setCount] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.product}>
        <Link to={`/product/${id}`} className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={thumbnail}
            loading="lazy"
            alt="product"
          />
          <div className={styles.discount}>
            -{Math.ceil(discountPercentage)}%
          </div>
          <div className={styles.rating}>
            <AiFillStar className={styles.star} />
            {rating.toFixed(1)}
          </div>
        </Link>
        <Link to={`/product/${id}`} className="link">
          <h4 className={styles.title}>{title}</h4>
        </Link>
        <div className={styles.bottom}>
          <div className={styles.prices}>
            <div className={styles.price}>{price} $</div>
            <div className={styles.secondPrice}>
              {Math.ceil(price * (1 + discountPercentage / 100))} $
            </div>
          </div>
          <button onClick={() => setCount(count + 1)} className={styles.button}>
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
  );
};

export default ProductItem;
