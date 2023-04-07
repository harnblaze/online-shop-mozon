import { IProduct } from '../../types/products';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IProductsState {
  entities: IProduct[];
  isLoading: boolean;
  error: null | string;
}

const initialState: IProductsState = {
  entities: [],
  isLoading: true,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsRequested: state => {
      state.isLoading = true;
    },
    productsReceived: (state, action: PayloadAction<IProduct[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    productsRequestFailed: state => {
      state.isLoading = true;
    },
  },
});

export const { reducer: productsReducer, actions: productsActions } =
  productSlice;
