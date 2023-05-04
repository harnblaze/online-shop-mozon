import React, { FC } from 'react';
import { Container } from 'react-bootstrap';

const NoProducts: FC = () => {
  return (
    <Container className={'text-center justify-content-center'}>
      <h3 className={'text-center'}>Извините, нет ни одного товара</h3>
    </Container>
  );
};

export default NoProducts;
