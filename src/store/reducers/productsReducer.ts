import { IProduct, ISortPayload, ISortType } from '../../types/products';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IProductsState {
  entities: IProduct[];
  isLoading: boolean;
  error: null | string;
  currentSort: ISortType;
  order: boolean;
}

const initialState: IProductsState = {
  entities: [],
  isLoading: true,
  error: null,
  currentSort: { sortName: 'алфавиту', sortProperty: 'title' },
  order: false,
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
    productsRequestFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    sortChanged: (state, action: PayloadAction<ISortPayload>) => {
      state.currentSort = action.payload.currentSort;
      state.order = action.payload.order;
    },
  },
});

export const { reducer: productsReducer, actions: productsActions } =
  productSlice;
