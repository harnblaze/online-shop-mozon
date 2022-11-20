import React, { FC, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Product from '../product/Product';

import { useActions } from '../../hooks/useActions';

const ProductsList: FC = () => {
  const { response, error, loading } = useTypedSelector(state => state.product);
  const { products } = response;
  const { fetchProducts } = useActions();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <h3>Идет загрузка...</h3>;
  }
  if (error != null) {
    return <h3>{error}</h3>;
  }
  if (products != null) {
    return (
      <>
        {products.map(product => {
          return <Product product={product} key={product.id} />;
        })}
      </>
    );
  }
  return <div></div>;
};

export default ProductsList;
