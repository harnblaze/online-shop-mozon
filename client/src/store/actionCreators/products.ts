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
            let message
            if (e.response.status === 401) {
                message = e.response.data.message;
            } else {
                message = e.message
            }
            dispatch(productsRequestFailed(message));
        }
    };

export const removeProduct =
    (productId: string) => async (dispatch: AppDispatch) => {
        dispatch(productRemoveRequested());
        try {
            const {content} = await productService.removeProduct(productId);
            dispatch(productRemoved(content._id));
            return true
        } catch (e: any) {
            dispatch(productsRequestFailed(e.message));
            return false
        }
    };

export const createProduct =
    (payload: Omit<IProduct, '_id'>) => async (dispatch: AppDispatch) => {
        dispatch(productCreateRequested());
        try {
            const {content} = await productService.createProduct(payload);
            dispatch(productCreated(content));
            return true
        } catch (error: any) {
            dispatch(productsRequestFailed(error.message));
            return false
        }
    };

export const updateProduct =
    (payload: IProduct) => async (dispatch: AppDispatch) => {
        productUpdateRequested();
        try {
            const {content} = await productService.update(payload);
            await dispatch(productUpdated(content));
            return true
        } catch (e: any) {
            dispatch(productsRequestFailed(e));
            return false
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
