import axios from 'axios';
import IResponse from '../../types/response';
import { ProductAction, ProductActionTypes } from '../../types/product';
import { Dispatch } from 'redux';

export const fetchProducts = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({ type: ProductActionTypes.FETCH_PRODUCTS });
      const response = await axios.get<IResponse>(
        'https://dummyjson.com/products?limit=30',
      );
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_ERROR,
        payload: 'Произошла ошибка при загрузке товаров',
      });
    }
  };
};
