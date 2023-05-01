import { AppDispatch, RootState } from '../index';
import { sortActions } from '../reducers/sortReducer';
import { ISortPayload } from '../../types/products';

const { sortChanged } = sortActions;

export const setSortingProducts =
  (payload: ISortPayload) => (dispatch: AppDispatch) => {
    dispatch(sortChanged(payload));
  };

export const getOrder = () => (state: RootState) => state.sort.order;
export const getSort = () => (state: RootState) => state.sort.currentSort;
