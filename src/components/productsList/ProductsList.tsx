import React, { FC, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Product from '../product/Product';

import { useActions } from '../../hooks/useActions';
import { createArrayOfNumbers } from '../../utils/utils';

const ProductsList: FC = () => {
  const { products, error, loading, limit, skip, total } = useTypedSelector(
    state => state.product,
  );
  const { currentCategory } = useTypedSelector(state => state.category);

  const pagesCount = Math.ceil(total / limit);
  const pages = createArrayOfNumbers(1, pagesCount + 1);

  const { fetchProducts, setProductPage, fetchProductsOfCategory } =
    useActions();

  const changePage = (page: number): void => {
    setProductPage(limit * page - limit);
  };

  useEffect(() => {
    if (currentCategory !== null) {
      fetchProductsOfCategory(currentCategory, 10, skip);
    } else {
      fetchProducts(10, skip);
    }
  }, [skip, currentCategory]);

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
      {pages.length !== 1 && (
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
      )}
    </>
  );
};

export default ProductsList;
