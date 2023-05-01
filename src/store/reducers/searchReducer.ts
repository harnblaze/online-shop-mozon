import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchState {
  query: string;
}

const initialState: ISearchState = {
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchQueryChanged(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { reducer: searchReducer, actions: searchActions } = searchSlice;
