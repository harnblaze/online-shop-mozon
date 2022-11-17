import React, { FC } from 'react';
import Header from './components/header/Header';
import Categories from './components/categories/Categories';
import Sort from './components/sort/Sort';

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Categories />
        <Sort />
      </div>
    </div>
  );
};

export default App;
