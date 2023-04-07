import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../types/category';

export interface ICategoryState {
  entities: ICategory[];
  isLoading: boolean;
  error: null | string;
  currentCategory: string | null;
}

const initialState: ICategoryState = {
  entities: [],
  isLoading: false,
  error: null,
  currentCategory: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoryRequested: state => {
      state.isLoading = true;
    },
    categoryReceived: (state, action: PayloadAction<ICategory[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    categoryRequestFailed: state => {
      state.isLoading = true;
    },
  },
});

export const { reducer: categoriesReducer, actions: categoriesActions } =
  categorySlice;
