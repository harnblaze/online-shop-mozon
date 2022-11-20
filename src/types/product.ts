export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export enum ProductActionTypes {
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR',
  SET_PRODUCT_PAGE = 'SET_PRODUCT_PAGE',
}

export interface IProductState {
  products: IProduct[];
  loading: boolean;
  error: null | string;
  total: number;
  skip: number;
  limit: number;
}

interface IFetchProductsAction {
  type: ProductActionTypes.FETCH_PRODUCTS;
}

interface IFetchProductsSuccessAction {
  type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS;
  payload: { products: IProduct[]; total: number };
}

interface IFetchProductsErrorAction {
  type: ProductActionTypes.FETCH_PRODUCTS_ERROR;
  payload: string;
}

interface ISetProductPage {
  type: ProductActionTypes.SET_PRODUCT_PAGE;
  payload: number;
}

export type ProductAction =
  | IFetchProductsAction
  | IFetchProductsSuccessAction
  | IFetchProductsErrorAction
  | ISetProductPage;
