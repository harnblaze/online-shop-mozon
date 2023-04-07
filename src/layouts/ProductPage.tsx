import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import Product from '../components/ui/product/Product';

const ProductPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useActions();
  const product = useTypedSelector(getProductById(id));

  if (product === undefined)
    return <h1>Извините, но такого товара не нашлось</h1>;

  return <Product {...product} />;
};

export default ProductPage;
