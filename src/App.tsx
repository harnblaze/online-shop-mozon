import React, { FC, useEffect, useState } from 'react';
import Header from './components/header/Header';
import Categories from './components/categories/Categories';
import Sort from './components/sort/Sort';
import IProduct from './types/product';
import axios from 'axios';
import IResponse from './types/response';
import Product from './components/product/Product';

const App: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    void fetchProducts();
    void fetchCategories();
  }, []);

  async function fetchProducts(): Promise<void> {
    try {
      const response = await axios.get<IResponse>(
        'https://dummyjson.com/products?limit=50',
      );
      setProducts(response.data.products);
    } catch (e) {
      alert(e);
    }
  }

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
          {products.map(el => (
            <Product product={el} key={el.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
