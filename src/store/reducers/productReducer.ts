import {
  IProductState,
  ProductAction,
  ProductActionTypes,
} from '../../types/product';

const initialState: IProductState = {
  product: undefined,
  loading: true,
  error: null,
};

export const productReducer = (
  state = initialState,
  action: ProductAction,
): IProductState => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCT:
      return { ...state, loading: true };
    case ProductActionTypes.FETCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case ProductActionTypes.FETCH_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
