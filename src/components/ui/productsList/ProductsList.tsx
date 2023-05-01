import React, { FC, memo } from 'react';
import ProductItem from '../productItem/ProductItem';
import { Container, Row } from 'react-bootstrap';
import { IProduct } from '../../../types/products';

interface IProductsListProps {
  products: IProduct[];
}

const ProductsList: FC<IProductsListProps> = ({ products }) => {
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

export default memo(ProductsList);
