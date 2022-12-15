import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { productsReducer } from './reducers/productsReducer';
import { categoriesReducer } from './reducers/categoryReducer';
import { productReducer } from './reducers/productReducer';

export const rootReducer = combineReducers({
  products: productsReducer,
  category: categoriesReducer,
  product: productReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
