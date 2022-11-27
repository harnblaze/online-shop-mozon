export enum CategoryActionTypes {
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR',
  SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY',
}

export interface ICategoryState {
  categories: string[];
  loading: boolean;
  error: null | string;
  currentCategory: number;
}

interface IFetchCategoriesAction {
  type: CategoryActionTypes.FETCH_CATEGORIES;
}

interface IFetchCategoriesSuccessAction {
  type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS;
  payload: string[];
}

interface IFetchCategoriesErrorAction {
  type: CategoryActionTypes.FETCH_CATEGORIES_ERROR;
  payload: string;
}

interface ISetCurrentCategoryAction {
  type: CategoryActionTypes.SET_CURRENT_CATEGORY;
  payload: number;
}

export type CategoryAction =
  | IFetchCategoriesAction
  | IFetchCategoriesSuccessAction
  | IFetchCategoriesErrorAction
  | ISetCurrentCategoryAction;
