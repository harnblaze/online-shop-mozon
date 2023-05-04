import React, { FC } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getProducts } from '../../store/actionCreators/products';
import NoProducts from '../common/NoProducts';
import Products from '../../layouts/Products';

const Catalog: FC = () => {
  const products = useTypedSelector(getProducts());
  if (products === null || products.length === 0) return <NoProducts />;
  return <Products products={products} />;
};

export default Catalog;
