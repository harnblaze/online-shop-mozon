import { productsActions } from '../reducers/productsReducer';
import { AppDispatch, RootState } from '../index';
import productService from '../../services/product.service';
import { ISortPayload } from '../../types/products';

const {
  productsRequested,
  productsRequestFailed,
  productsReceived,
  sortChanged,
} = productsActions;

export const fetchingProductsList =
  () => async (dispatch: AppDispatch, getState?: () => RootState) => {
    if (getState !== undefined) {
      dispatch(productsRequested());
    }
    try {
      const { content } = await productService.get();
      dispatch(productsReceived(content));
    } catch (e: any) {
      dispatch(productsRequestFailed(e.message));
    }
  };
export const setSortingProducts =
  (payload: ISortPayload) => (dispatch: AppDispatch, state: RootState) => {
    dispatch(sortChanged(payload));
  };

export const getProducts = () => (state: RootState) => state.products.entities;
export const getProductsLoadingStatus = () => (state: RootState) =>
  state.products.isLoading;
export const getProductsErrors = () => (state: RootState) =>
  state.products.error;
export const getProductById = (productId: string) => (state: RootState) => {
  return state.products.entities.find(prod => prod.id === productId);
};
export const getOrder = () => (state: RootState) => state.products.order;
export const getSort = () => (state: RootState) => state.products.currentSort;
