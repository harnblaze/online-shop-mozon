import {
  IProductsState,
  ProductsAction,
  ProductsActionTypes,
} from '../../types/products';

const initialState: IProductsState = {
  products: [],
  loading: true,
  error: null,
  total: 10,
  skip: 0,
};

export const productsReducer = (
  state = initialState,
  action: ProductsAction,
): IProductsState => {
  switch (action.type) {
    case ProductsActionTypes.FETCH_PRODUCTS:
      return { ...state, loading: true };
    case ProductsActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        total: action.payload.total,
        skip: action.payload.skip,
      };
    case ProductsActionTypes.FETCH_PRODUCTS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ProductsActionTypes.FETCH_PRODUCTS_OF_CATEGORY:
      return { ...state, loading: true };
    case ProductsActionTypes.FETCH_PRODUCTS_OF_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        total: action.payload.total,
        skip: action.payload.skip,
      };
    case ProductsActionTypes.FETCH_PRODUCTS_OF_CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ProductsActionTypes.SET_PRODUCTS_PAGE:
      return { ...state, skip: action.payload };
    case ProductsActionTypes.SET_SORTING_PRODUCTS:
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
