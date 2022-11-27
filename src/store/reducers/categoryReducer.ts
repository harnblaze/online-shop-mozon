import {
  CategoryAction,
  CategoryActionTypes,
  ICategoryState,
} from '../../types/category';

const initialState: ICategoryState = {
  categories: [],
  loading: false,
  error: null,
  currentCategory: 0,
};

export const categoriesReducer = (
  state = initialState,
  action: CategoryAction,
): ICategoryState => {
  switch (action.type) {
    case CategoryActionTypes.FETCH_CATEGORIES:
      return { ...state, loading: true };
    case CategoryActionTypes.FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case CategoryActionTypes.FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CategoryActionTypes.SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload };
    default:
      return state;
  }
};
