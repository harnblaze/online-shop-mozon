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
  FETCH_PRODUCTS_OF_CATEGORY = 'FETCH_PRODUCTS_OF_CATEGORY',
  FETCH_PRODUCTS_OF_CATEGORY_SUCCESS = 'FETCH_PRODUCTS_OF_CATEGORY_SUCCESS',
  FETCH_PRODUCTS_OF_CATEGORY_ERROR = 'FETCH_PRODUCTS_OF_CATEGORY_ERROR',
  SET_PRODUCT_PAGE = 'SET_PRODUCT_PAGE',
  SET_SORTING_PRODUCTS = 'SET_SORTING_PRODUCTS',
}

export interface IProductState {
  products: IProduct[];
  loading: boolean;
  error: null | string;
  total: number;
  skip: number;
}

interface IFetchProductsAction {
  type: ProductActionTypes.FETCH_PRODUCTS;
}

interface IFetchProductsSuccessAction {
  type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS;
  payload: { products: IProduct[]; total: number; skip: number };
}

interface IFetchProductsErrorAction {
  type: ProductActionTypes.FETCH_PRODUCTS_ERROR;
  payload: string;
}

interface IFetchProductsOfCategoryAction {
  type: ProductActionTypes.FETCH_PRODUCTS_OF_CATEGORY;
}

interface IFetchProductsOfCategorySuccessAction {
  type: ProductActionTypes.FETCH_PRODUCTS_OF_CATEGORY_SUCCESS;
  payload: { products: IProduct[]; total: number; skip: number };
}

interface IFetchProductsOfCategoryErrorAction {
  type: ProductActionTypes.FETCH_PRODUCTS_OF_CATEGORY_ERROR;
  payload: string;
}
interface ISetProductPage {
  type: ProductActionTypes.SET_PRODUCT_PAGE;
  payload: number;
}

interface ISetSortingProductsAction {
  type: ProductActionTypes.SET_SORTING_PRODUCTS;
  payload: { products: IProduct[]; total: number; skip: number };
}

export type ProductAction =
  | IFetchProductsAction
  | IFetchProductsSuccessAction
  | IFetchProductsErrorAction
  | IFetchProductsOfCategoryAction
  | IFetchProductsOfCategorySuccessAction
  | IFetchProductsOfCategoryErrorAction
  | ISetProductPage
  | ISetSortingProductsAction;
