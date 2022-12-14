import React, { FC } from 'react';
import Header from './components/header/Header';
import { Redirect, Route, Switch } from 'react-router-dom';
import Products from './layouts/Products';
import Login from './layouts/Login';
import Cart from './layouts/Cart';
import NotFound from './layouts/NotFound';
import ProductPage from './layouts/ProductPage';

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={Cart} />
        <Route path="/404" component={NotFound} />

        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

export default App;
