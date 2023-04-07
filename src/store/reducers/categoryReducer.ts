import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../types/category';

export interface ICategoryState {
  entities: ICategory[];
  isLoading: boolean;
  error: null | string;
  currentCategory: string | undefined;
}

const initialState: ICategoryState = {
  entities: [],
  isLoading: true,
  error: null,
  currentCategory: undefined,
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
    categoryRequestFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    currentCategoryChanged: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.currentCategory = state.entities.find(
        category => category._id === action.payload,
      )?._id;
    },
  },
});

export const { reducer: categoriesReducer, actions: categoriesActions } =
  categorySlice;
