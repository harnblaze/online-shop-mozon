import React, { FC, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ProductItem from './productItem/ProductItem';

import { useActions } from '../../hooks/useActions';

import Pagination from '../pagination/Pagination';

const ProductsList: FC = () => {
  const { products, error, loading, skip, total } = useTypedSelector(
    state => state.products,
  );
  const { currentCategory } = useTypedSelector(state => state.category);
  const { fetchProducts, setProductPage, fetchProductsOfCategory } =
    useActions();

  const limitPage = 10;
  const pagesCount = Math.ceil(total / limitPage);
  let currentPage = skip / limitPage + 1;

  const changePage = (page: number): void => {
    currentPage = page;
    setProductPage(limitPage * page - limitPage);
    console.log(currentPage, page);
  };

  useEffect(() => {
    if (currentCategory !== null) {
      fetchProductsOfCategory(currentCategory, limitPage, skip);
    } else {
      fetchProducts(limitPage, skip);
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
      <div className="content__items">
        {products?.map(product => {
          return <ProductItem product={product} key={product.id} />;
        })}
      </div>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        changePage={changePage}
      />
    </>
  );
};

export default ProductsList;
