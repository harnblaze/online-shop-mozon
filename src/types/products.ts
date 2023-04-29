export interface IProduct {
  _id: string;
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

export type ISortProperty = keyof Pick<IProduct, 'rating' | 'price' | 'title'>;

export interface ISortType {
  sortName: string;
  sortProperty: ISortProperty;
}

export interface ISortPayload {
  order: boolean;
  currentSort: ISortType;
}

export enum ProductsActionTypes {
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR',
  FETCH_PRODUCTS_OF_CATEGORY = 'FETCH_PRODUCTS_OF_CATEGORY',
  FETCH_PRODUCTS_OF_CATEGORY_SUCCESS = 'FETCH_PRODUCTS_OF_CATEGORY_SUCCESS',
  FETCH_PRODUCTS_OF_CATEGORY_ERROR = 'FETCH_PRODUCTS_OF_CATEGORY_ERROR',
  SET_PRODUCTS_PAGE = 'SET_PRODUCTS_PAGE',
  SET_SORTING_PRODUCTS = 'SET_SORTING_PRODUCTS',
}

interface IFetchProductsAction {
  type: ProductsActionTypes.FETCH_PRODUCTS;
}

interface IFetchProductsSuccessAction {
  type: ProductsActionTypes.FETCH_PRODUCTS_SUCCESS;
  payload: { products: IProduct[]; total: number; skip: number };
}

interface IFetchProductsErrorAction {
  type: ProductsActionTypes.FETCH_PRODUCTS_ERROR;
  payload: string;
}

interface IFetchProductsOfCategoryAction {
  type: ProductsActionTypes.FETCH_PRODUCTS_OF_CATEGORY;
}

interface IFetchProductsOfCategorySuccessAction {
  type: ProductsActionTypes.FETCH_PRODUCTS_OF_CATEGORY_SUCCESS;
  payload: { products: IProduct[]; total: number; skip: number };
}

interface IFetchProductsOfCategoryErrorAction {
  type: ProductsActionTypes.FETCH_PRODUCTS_OF_CATEGORY_ERROR;
  payload: string;
}

interface ISetProductsPage {
  type: ProductsActionTypes.SET_PRODUCTS_PAGE;
  payload: number;
}

interface ISetSortingProductsAction {
  type: ProductsActionTypes.SET_SORTING_PRODUCTS;
  payload: { products: IProduct[]; total: number; skip: number };
}

export type ProductsAction =
  | IFetchProductsAction
  | IFetchProductsSuccessAction
  | IFetchProductsErrorAction
  | IFetchProductsOfCategoryAction
  | IFetchProductsOfCategorySuccessAction
  | IFetchProductsOfCategoryErrorAction
  | ISetProductsPage
  | ISetSortingProductsAction;
