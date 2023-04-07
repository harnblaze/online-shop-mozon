import React, { FC } from 'react';
import Categories from '../components/ui/categories/Categories';
import Sort from '../components/ui/sort/Sort';
import ProductsList from '../components/ui/productsList/ProductsList';

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
