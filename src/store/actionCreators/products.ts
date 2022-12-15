import axios from 'axios';
import {
  IProduct,
  ProductsAction,
  ProductsActionTypes,
} from '../../types/products';
import { Dispatch } from 'redux';
import IResponse from '../../types/response';

export const fetchProducts = (limit: number, skip = 0) => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    try {
      dispatch({ type: ProductsActionTypes.FETCH_PRODUCTS });
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
        type: ProductsActionTypes.FETCH_PRODUCTS_SUCCESS,
        payload: {
          products: response.data.products,
          total: response.data.total,
          skip: response.data.skip,
        },
      });
    } catch (e) {
      dispatch({
        type: ProductsActionTypes.FETCH_PRODUCTS_ERROR,
        payload: 'Произошла ошибка при загрузке товаров',
      });
    }
  };
};

export const fetchProductsOfCategory = (
  category: string,
  limit: number,
  skip = 0,
) => {
  return async (dispatch: Dispatch<ProductsAction>) => {
    try {
      dispatch({ type: ProductsActionTypes.FETCH_PRODUCTS_OF_CATEGORY });
      const response = await axios.get<IResponse>(
        `https://dummyjson.com/products/category/${category}`,
        {
          params: {
            limit,
            skip,
          },
        },
      );
      dispatch({
        type: ProductsActionTypes.FETCH_PRODUCTS_OF_CATEGORY_SUCCESS,
        payload: {
          products: response.data.products,
          total: response.data.total,
          skip: response.data.skip,
        },
      });
    } catch (e) {
      dispatch({
        type: ProductsActionTypes.FETCH_PRODUCTS_OF_CATEGORY_ERROR,
        payload: 'Произошла ошибка при загрузке товаров',
      });
    }
  };
};

export const setProductPage = (skip: number): ProductsAction => {
  return { type: ProductsActionTypes.SET_PRODUCTS_PAGE, payload: skip };
};

export const setSortingProductsPage = (
  products: IProduct[],

  skip: number,
  total: number,
): ProductsAction => {
  return {
    type: ProductsActionTypes.SET_SORTING_PRODUCTS,
    payload: { products, skip, total },
  };
};
