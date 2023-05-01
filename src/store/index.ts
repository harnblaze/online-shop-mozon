import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './reducers/productsReducer';
import { categoriesReducer } from './reducers/categoryReducer';
import { searchReducer } from './reducers/searchReducer';
import { sortReducer } from './reducers/sortReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  search: searchReducer,
  sort: sortReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
