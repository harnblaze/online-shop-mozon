import {productsActions} from '../reducers/productsReducer';
import {AppDispatch, RootState} from '../index';
import productService from '../../services/product.service';
import {createAction} from '@reduxjs/toolkit';
import {IProduct} from '../../types/products';

const {
    productsRequested,
    productsRequestFailed,
    productsReceived,
    productRemoved,
    productCreated,
    productUpdated,
    mockDataLoaded,
} = productsActions;
export const productRemoveRequested = createAction(
    'products/productRemoveRequested',
);
export const productCreateRequested = createAction(
    'products/productCreateRequested',
);
export const productUpdateRequested = createAction(
    'products/productUpdateRequested',
);

export const fetchingProductsList =
    () => async (dispatch: AppDispatch, getState?: () => RootState) => {
        if (getState !== undefined) {
            dispatch(productsRequested());
        }
        try {
            const {content} = await productService.get();
            dispatch(productsReceived(content));
        } catch (e: any) {
            dispatch(productsRequestFailed(e.message));
        }
    };

export const removeProduct =
    (productId: string) => async (dispatch: AppDispatch) => {
        dispatch(productRemoveRequested());
        try {
            const {content} = await productService.removeProduct(productId);
            if (content === null) {
                dispatch(productRemoved(productId));
            }
        } catch (e: any) {
            dispatch(productsRequestFailed(e.message));
        }
    };

export const createProduct =
    (payload: Omit<IProduct, '_id'>) => async (dispatch: AppDispatch) => {
        dispatch(productCreateRequested());
        try {
            const {content} = await productService.createProduct(payload);
            dispatch(productCreated(content));
        } catch (error: any) {
            dispatch(productsRequestFailed(error.message));
        }
    };

export const updateProduct =
    (payload: IProduct) => async (dispatch: AppDispatch) => {
        productUpdateRequested();
        try {
            const {content} = await productService.update(payload);
            await dispatch(productUpdated(content));
        } catch (e: any) {
            dispatch(productsRequestFailed(e));
        }
    };

export const loadMockData = () => (dispatch: AppDispatch) => {
    dispatch(mockDataLoaded());
};

export const getProducts = () => (state: RootState) => state.products.entities;
export const getProductsLoadingStatus = () => (state: RootState) =>
    state.products.isLoading;
export const getProductsErrors = () => (state: RootState) =>
    state.products.error;
export const getProductById = (productId: string) => (state: RootState) => {
    if (state.products.entities.length > 0) {
        return state.products.entities.find(prod => prod._id === productId);
    }
};
export const getIsMockDataLoaded = () => (state: RootState) =>
    state.products.isMockDataLoaded;
