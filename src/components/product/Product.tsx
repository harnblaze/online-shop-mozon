import React, { FC } from 'react';
import { IProduct } from '../../types/products';

const Product: FC<IProduct> = ({ title }) => {
  return <h1>{title}</h1>;
};

export default Product;
