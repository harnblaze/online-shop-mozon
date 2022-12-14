import React, { FC } from 'react';
import Categories from '../components/categories/Categories';
import Sort from '../components/sort/Sort';
import ProductsList from '../components/productsList/ProductsList';

const Products: FC = () => {
  return (
    <>
      <div className="container">
        <Categories />
        <Sort />
      </div>
      <div className="content__container">
        <h2 className="content__title">Все товары</h2>
        <ProductsList />
      </div>
    </>
  );
};

export default Products;
