import React, { FC } from 'react';
import Header from './components/ui/Header';
import { Redirect, Route, Switch } from 'react-router-dom';
import Products from './layouts/Products';
import Auth from './layouts/Auth';
import Cart from './layouts/Cart';
import NotFound from './layouts/NotFound';
import ProductPage from './layouts/ProductPage';
import AppLoader from './components/hoc/AppLoader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: FC = () => {
  return (
    <>
      <AppLoader>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/auth/:type?" component={Auth} />
            <Route path="/cart" component={Cart} />
            <Route path="/404" component={NotFound} />

            <Redirect to="/404" />
          </Switch>
        </div>
      </AppLoader>
      <ToastContainer />
    </>
  );
};

export default App;
