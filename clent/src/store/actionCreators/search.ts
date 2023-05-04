import { searchActions } from '../reducers/searchReducer';
import { AppDispatch, RootState } from '../index';

const { searchQueryChanged } = searchActions;

export const getSearchQuery = () => (state: RootState) => state.search.query;
export const setSearchQuery = (query: string) => (dispatch: AppDispatch) => {
  dispatch(searchQueryChanged(query));
};
