import {
  IProductState,
  ProductAction,
  ProductActionTypes,
} from '../../types/product';

const initialResponse = {
  products: [],
  total: 0,
  skip: 0,
  limit: 100,
};

const initialState: IProductState = {
  response: initialResponse,
  loading: false,
  error: null,
};

export const productReducer = (
  state = initialState,
  action: ProductAction,
): IProductState => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS:
      return { loading: true, error: null, response: initialResponse };
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return { loading: false, error: null, response: action.payload };
    case ProductActionTypes.FETCH_PRODUCTS_ERROR:
      return {
        loading: false,
        error: action.payload,
        response: initialResponse,
      };
    default:
      return state;
  }
};
