import { categoriesActions } from '../reducers/categoryReducer';
import { AppDispatch, RootState } from '../index';
import categoryService from '../../services/category.service';

const { categoryRequested, categoryRequestFailed, categoryReceived } =
  categoriesActions;

export const fetchingCategories = () => async (dispatch: AppDispatch) => {
  dispatch(categoryRequested());
  try {
    const { content } = await categoryService.get();
    dispatch(categoryReceived(content));
  } catch (e: any) {
    categoryRequestFailed(e.message);
    console.dir(e);
  }
};

export const getCategories = () => (state: RootState) =>
  state.categories.entities;
export const getCategoriesLoadingStatus = () => (state: RootState) =>
  state.categories.isLoading;
