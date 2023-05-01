import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Product from '../components/ui/Product';
import { getProductById } from '../store/actionCreators/products';

const ProductPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const product = useTypedSelector(getProductById(id));

  if (product === undefined)
    return <h1>Извините, но такого товара не нашлось</h1>;

  return <Product {...product} />;
};

export default ProductPage;
