import React, { FC } from 'react';
import Header from './components/header/Header';
import Categories from './components/categories/Categories';

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <Categories />
    </div>
  );
};

export default App;
