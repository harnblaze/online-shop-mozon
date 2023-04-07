import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import Product from '../components/product/Product';

const ProductPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const {} = useTypedSelector();
  const { fetchSingleProduct } = useActions();

  useEffect(() => {
    fetchSingleProduct(id);
  }, []);

  if (loading) {
    return <h3>Идет загрузка...</h3>;
  }
  if (error != null) {
    return <h3>{error}</h3>;
  }
  if (product === undefined)
    return <h1>Извините, но такого товара не нашлось</h1>;

  return <Product {...product} />;
};

export default ProductPage;
