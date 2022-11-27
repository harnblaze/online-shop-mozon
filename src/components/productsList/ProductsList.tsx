import React, { FC, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Product from '../product/Product';

import { useActions } from '../../hooks/useActions';
import { createArrayOfNumbers } from '../../utils/utils';

const ProductsList: FC = () => {
  const { products, error, loading, limit, skip, total } = useTypedSelector(
    state => state.product,
  );

  const pagesCount = Math.ceil(total / limit);
  const pages = createArrayOfNumbers(1, pagesCount + 1);

  const { fetchProducts, setProductPage } = useActions();

  const changePage = (page: number): void => {
    setProductPage(limit * page - limit);
  };

  useEffect(() => {
    fetchProducts(10, skip);
  }, [skip]);

  if (loading) {
    return <h3>Идет загрузка...</h3>;
  }
  if (error != null) {
    return <h3>{error}</h3>;
  }

  return (
    <>
      {products?.map(product => {
        return <Product product={product} key={product.id} />;
      })}
      <div style={{ display: 'flex', gap: '5px' }}>
        {pages.map(page => {
          return (
            <div
              key={page}
              onClick={() => changePage(page)}
              style={{
                border:
                  page === skip / limit + 1
                    ? '2px solid blue'
                    : '1px solid gray',
                padding: 10,
              }}
            >
              {page}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductsList;
