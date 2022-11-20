import axios from 'axios';
import { ProductAction, ProductActionTypes } from '../../types/product';
import { Dispatch } from 'redux';
import IResponse from '../../types/response';

export const fetchProducts = (limit = 30, skip = 0) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({ type: ProductActionTypes.FETCH_PRODUCTS });
      const response = await axios.get<IResponse>(
        'https://dummyjson.com/products',
        {
          params: {
            limit,
            skip,
          },
        },
      );
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
        payload: {
          products: response.data.products,
          total: response.data.total,
        },
      });
    } catch (e) {
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_ERROR,
        payload: 'Произошла ошибка при загрузке товаров',
      });
    }
  };
};

export const setProductPage = (skip: number): ProductAction => {
  return { type: ProductActionTypes.SET_PRODUCT_PAGE, payload: skip };
};
