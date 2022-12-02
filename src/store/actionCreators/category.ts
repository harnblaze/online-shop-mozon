import axios from 'axios';
import { Dispatch } from 'redux';
import { CategoryAction, CategoryActionTypes } from '../../types/category';

export const fetchCategories = () => {
  return async (dispatch: Dispatch<CategoryAction>) => {
    try {
      dispatch({ type: CategoryActionTypes.FETCH_CATEGORIES });
      const response = await axios.get<string[]>(
        'https://dummyjson.com/products/categories',
      );
      dispatch({
        type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CategoryActionTypes.FETCH_CATEGORIES_ERROR,
        payload: 'Произошла ошибка при загрузке категорий товаров',
      });
    }
  };
};

export const setCurrentCategory = (category: string): CategoryAction => {
  return { type: CategoryActionTypes.SET_CURRENT_CATEGORY, payload: category };
};
