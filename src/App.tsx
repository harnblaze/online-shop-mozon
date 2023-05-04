import React, { FC } from 'react';
import Header from './components/ui/Header';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './layouts/Auth';
import Cart from './layouts/Cart';
import NotFound from './layouts/NotFound';
import ProductPage from './layouts/ProductPage';
import AppLoader from './components/hoc/AppLoader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/common/ProtectedRoute';
import LogOut from './layouts/LogOut';
import Dashboard from './layouts/Dashboard';
import ProtectedAdminRoute from './components/common/ProtectedAdminRoute';
import Catalog from './layouts/Catalog';
import UserLoader from './components/hoc/UserLoader';

const App: FC = () => {
  return (
    <>
      <UserLoader>
        <div className="App">
          <Header />
          <AppLoader>
            <Switch>
              <ProtectedRoute path="/" exact={true} component={Catalog} />
              <ProtectedAdminRoute
                path="/dashboard"
                exact={true}
                component={Dashboard}
              />
              <ProtectedRoute
                exact={false}
                path="/product/:id"
                component={ProductPage}
              />
              <Route path="/auth/:type?" component={Auth} />
              <Route path="/logout" component={LogOut} />
              <ProtectedRoute exact={false} path="/cart" component={Cart} />
              <Route path="/404" component={NotFound} />

              <Redirect to="/404" />
            </Switch>
          </AppLoader>
        </div>
      </UserLoader>
      <ToastContainer />
    </>
  );
};

export default App;
