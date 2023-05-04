import React, { FC } from 'react';
import { Container, Row } from 'react-bootstrap';
import MockDataButton from '../ui/MockDataButton';

const NoProducts: FC = () => {
  return (
    <Container>
      <Row>
        <h3 className={'text-center'}>
          Извините, нет ни одного товара, но вы можете загрузить фейковые товары
        </h3>
        <MockDataButton />
      </Row>
    </Container>
  );
};

export default NoProducts;
