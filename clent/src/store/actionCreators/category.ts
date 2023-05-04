import { categoriesActions } from '../reducers/categoryReducer';
import { AppDispatch, RootState } from '../index';
import categoryService from '../../services/category.service';

const {
  categoryRequested,
  categoryRequestFailed,
  categoryReceived,
  currentCategoryChanged,
} = categoriesActions;

export const fetchingCategories = () => async (dispatch: AppDispatch) => {
  dispatch(categoryRequested());
  try {
    const { content } = await categoryService.get();
    dispatch(categoryReceived(content));
  } catch (e: any) {
    categoryRequestFailed(e.message);
  }
};

export const getCategories = () => (state: RootState) =>
  state.categories.entities;
export const getCategoriesLoadingStatus = () => (state: RootState) =>
  state.categories.isLoading;
export const getCategoriesError = () => (state: RootState) =>
  state.categories.error;
export const getCurrentCategory = () => (state: RootState) =>
  state.categories.currentCategory;
export const setCurrentCategory =
  (category: string | undefined) => (dispatch: AppDispatch) => {
    dispatch(currentCategoryChanged(category));
  };
