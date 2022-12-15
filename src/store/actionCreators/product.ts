import { Dispatch } from 'redux';

import axios from 'axios';
import { ProductAction, ProductActionTypes } from '../../types/product';
import { IProduct } from '../../types/products';

export const fetchSingleProduct = (id: string) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({ type: ProductActionTypes.FETCH_PRODUCT });
      const response = await axios.get<IProduct>(
        `https://dummyjson.com/products/${id}`,
      );
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCT_ERROR,
        payload: 'Произошла ошибка при загрузке товара',
      });
    }
  };
};
