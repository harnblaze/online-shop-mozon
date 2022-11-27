import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { productReducer } from './reducers/productReducer';
import { categoriesReducer } from './reducers/categoryReducer';

export const rootReducer = combineReducers({
  product: productReducer,
  category: categoriesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
