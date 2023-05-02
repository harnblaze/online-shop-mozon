import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { Router } from 'react-router-dom';
import history from './utils/history';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
);
