export enum CategoryActionTypes {
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR',
  SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY',
}

export interface ICategory {
  _id: string;
  name: string;
}

interface IFetchCategoriesAction {
  type: CategoryActionTypes.FETCH_CATEGORIES;
}

interface IFetchCategoriesSuccessAction {
  type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS;
  payload: ICategory[];
}

interface IFetchCategoriesErrorAction {
  type: CategoryActionTypes.FETCH_CATEGORIES_ERROR;
  payload: string;
}

interface ISetCurrentCategoryAction {
  type: CategoryActionTypes.SET_CURRENT_CATEGORY;
  payload: string | null;
}

export type CategoryAction =
  | IFetchCategoriesAction
  | IFetchCategoriesSuccessAction
  | IFetchCategoriesErrorAction
  | ISetCurrentCategoryAction;
