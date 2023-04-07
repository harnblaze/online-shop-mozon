import { IProduct } from './products';

export enum ProductActionTypes {
  FETCH_PRODUCT = 'FETCH_PRODUCT',
  FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS',
  FETCH_PRODUCT_ERROR = 'FETCH_PRODUCT_ERROR',
}

interface IFetchProductAction {
  type: ProductActionTypes.FETCH_PRODUCT;
}

interface IFetchProductSuccessAction {
  type: ProductActionTypes.FETCH_PRODUCT_SUCCESS;
  payload: IProduct;
}

interface IFetchProductErrorAction {
  type: ProductActionTypes.FETCH_PRODUCT_ERROR;
  payload: string;
}

export type ProductAction =
  | IFetchProductAction
  | IFetchProductSuccessAction
  | IFetchProductErrorAction;
