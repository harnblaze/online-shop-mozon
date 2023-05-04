import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISortPayload, ISortType } from '../../types/products';

interface ISortState {
  currentSort: ISortType;
  order: boolean;
}

const initialState: ISortState = {
  currentSort: { sortName: 'алфавиту', sortProperty: 'title' },
  order: false,
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    sortChanged: (state, action: PayloadAction<ISortPayload>) => {
      state.currentSort = action.payload.currentSort;
      state.order = action.payload.order;
    },
  },
});

export const { reducer: sortReducer, actions: sortActions } = sortSlice;
