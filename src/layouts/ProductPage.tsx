import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  return <h1>{'ProductPage ' + id} </h1>;
};

export default ProductPage;
