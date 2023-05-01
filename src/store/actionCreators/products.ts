import { productsActions } from '../reducers/productsReducer';
import { AppDispatch, RootState } from '../index';
import productService from '../../services/product.service';

const { productsRequested, productsRequestFailed, productsReceived } =
  productsActions;

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

export const getProducts = () => (state: RootState) => state.products.entities;
export const getProductsLoadingStatus = () => (state: RootState) =>
  state.products.isLoading;
export const getProductsErrors = () => (state: RootState) =>
  state.products.error;
export const getProductById = (productId: string) => (state: RootState) => {
  if (state.products.entities.length > 0) {
    return state.products.entities.find(prod => prod._id === productId);
  }
};
