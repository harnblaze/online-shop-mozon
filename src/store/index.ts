import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './reducers/productsReducer';
import { categoriesReducer } from './reducers/categoryReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
