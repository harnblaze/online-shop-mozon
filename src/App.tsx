import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/header/Header';
import Categories from './components/categories/Categories';
import Sort from './components/sort/Sort';
import ProductsList from './components/productsList/ProductsList';

const App: FC = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    void fetchCategories();
  }, []);

  async function fetchCategories(): Promise<void> {
    try {
      const response = await axios.get<string[]>(
        'https://dummyjson.com/products/categories',
      );
      setCategories(response.data);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Categories categories={categories} />
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
