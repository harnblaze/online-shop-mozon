import React, { FC } from 'react';
import Header from './components/header/Header';
import Categories from './components/categories/Categories';
import Sort from './components/sort/Sort';
import ProductsList from './components/productsList/ProductsList';

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Categories />
        <Sort />
      </div>
      <div className="content__container">
        <h2 className="content__title">Все товары</h2>
        <div className="content__items">
          <ProductsList />
        </div>
      </div>
    </div>
  );
};

export default App;
