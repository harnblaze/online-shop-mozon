import React, { FC } from 'react';
import Categories from '../components/ui/categories/Categories';
import Sort from '../components/ui/sort/Sort';
import ProductsList from '../components/ui/productsList/ProductsList';
import { Col, Container, Row } from 'react-bootstrap';

const Products: FC = () => {
  return (
    <>
      <Container>
        <Row className={'justify-content-around flex-grow-1'}>
          <Col xs={'auto'}>
            <Categories />
          </Col>
          <Col xs={'auto'}>
            <Sort />
          </Col>
        </Row>
      </Container>
      <div className="content__container">
        <h2 className="content__title">Все товары</h2>
        <ProductsList />
      </div>
    </>
  );
};

export default Products;
