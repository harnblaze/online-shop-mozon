import React, { FC } from 'react';
import Header from './components/ui/Header';
import { Redirect, Route, Switch } from 'react-router-dom';
import Products from './layouts/Products';
import Login from './layouts/Login';
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
            <Route path="/login" component={Login} />
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
