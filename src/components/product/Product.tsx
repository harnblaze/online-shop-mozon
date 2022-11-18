import React, { FC, useState } from 'react';
import IProduct from '../../types/product';
import styles from './Product.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';

interface IProductProps {
  product: IProduct;
}

const Product: FC<IProductProps> = ({ product }) => {
  const { thumbnail, title, price, discountPercentage } = product;
  const [count, setCount] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.product}>
        <img className={styles.image} src={thumbnail} alt="product" />
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.bottom}>
          <div>
            <div className={styles.discount}>
              -{Math.ceil(discountPercentage)}%
            </div>
            <div className={styles.price}>{price} $</div>
          </div>
          <div className={styles.secondPrice}>
            {Math.ceil(price * (1 + discountPercentage / 100))} $
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

export default Product;
