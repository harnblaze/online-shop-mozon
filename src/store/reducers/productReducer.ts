import {
  IProductState,
  ProductAction,
  ProductActionTypes,
} from '../../types/product';

const initialState: IProductState = {
  products: [],
  loading: true,
  error: null,
  total: 10,
  skip: 0,
};

export const productReducer = (
  state = initialState,
  action: ProductAction,
): IProductState => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS:
      return { ...state, loading: true };
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        total: action.payload.total,
        skip: action.payload.skip,
      };
    case ProductActionTypes.FETCH_PRODUCTS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ProductActionTypes.FETCH_PRODUCTS_OF_CATEGORY:
      return { ...state, loading: true };
    case ProductActionTypes.FETCH_PRODUCTS_OF_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        total: action.payload.total,
        skip: action.payload.skip,
      };
    case ProductActionTypes.FETCH_PRODUCTS_OF_CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ProductActionTypes.SET_PRODUCT_PAGE:
      return { ...state, skip: action.payload };
    case ProductActionTypes.SET_SORTING_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        total: action.payload.total,
        skip: action.payload.skip,
      };
    default:
      return state;
  }
};
