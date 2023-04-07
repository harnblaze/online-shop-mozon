import React, { FC } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import ProductItem from '../productItem/ProductItem';

const ProductsList: FC = () => {
  const {
    entities: products,
    error,
    isLoading,
  } = useTypedSelector(state => state.products);

  if (isLoading) {
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
      {/* <Pagination */}
      {/*  pagesCount={pagesCount */}
      {/*  currentPage={currentPage} */}
      {/*  changePage={changePage} */}
      {/* /> */}
    </>
  );
};

export default ProductsList;
