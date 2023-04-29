import React, { FC } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import ProductItem from '../productItem/ProductItem';
import { Container, Row } from 'react-bootstrap';

const ProductsList: FC = () => {
  const { entities: products } = useTypedSelector(state => state.products);

  return (
    <>
      <Container>
        <Row>
          {products?.map(product => {
            return <ProductItem product={product} key={product._id} />;
          })}
        </Row>
      </Container>
      {/* <Pagination */}
      {/*  pagesCount={pagesCount */}
      {/*  currentPage={currentPage} */}
      {/*  changePage={changePage} */}
      {/* /> */}
    </>
  );
};

export default ProductsList;
