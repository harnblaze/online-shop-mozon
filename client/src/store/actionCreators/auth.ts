import authService, {ISignInData, ISignUpData, IUpdateUserData,} from '../../services/auth.service';
import {AppDispatch, RootState} from '../index';
import userService from '../../services/user.service';
import history from '../../utils/history';
import localStorageService from '../../services/localStorage.service';
import {authActions} from '../reducers/authReducer';
import {generateAuthError} from '../../utils/generateAuthErrors';
import {createAction} from '@reduxjs/toolkit';

const {
    userRequested,
    userReceived,
    userRequestFailed,
    authRequested,
    authRequestFailed,
    authRequestSuccess,
    userUpdateRequested,
    userUpdateSuccess,
    userLoggedOut,
} = authActions;

export const userUpdateFailed = createAction('auth/userUpdateFailed');

export const signIn =
    ({payload, redirect}: { payload: ISignInData; redirect: string }) =>
        async (dispatch: AppDispatch) => {
            dispatch(authRequested());
            try {
                const data = await authService.login(payload);
                localStorageService.setTokens(data);
                dispatch(authRequestSuccess(data.userId));
                history.push(redirect);
            } catch (e: any) {
                const {code, message} = e.response.data.error;
                if (code === 400) {
                    const errorMessage = generateAuthError(message);
                    dispatch(authRequestFailed(errorMessage));
                } else {
                    dispatch(authRequestFailed(e.message));
                }
            }
        };

export const singUp =
    (payload: ISignUpData) => async (dispatch: AppDispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register(payload);
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess(data.userId));
            history.push('/')
        } catch (e: any) {
            dispatch(authRequestFailed(e.message));
        }
    };

export const logOut = () => (dispatch: AppDispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push('/');
};

export const updateUser =
    (payload: IUpdateUserData) => async (dispatch: AppDispatch) => {
        userUpdateRequested();
        try {
            const {content} = await userService.update(payload);
            await dispatch(userUpdateSuccess(content));
            history.push(`/users/${payload._id}`);
        } catch (e: any) {
            dispatch(userUpdateFailed(e));
        }
    };

export const loadUserData = () => async (dispatch: AppDispatch) => {
    dispatch(userRequested());
    try {
        const data = await userService.getCurrentUser();
        dispatch(userReceived(data?.content ?? null));
    } catch (e: any) {
        let message
        if (e.response.status === 401) {
            message = e.response.data.message;
        } else {
            message = e.message
        }
        dispatch(userRequestFailed(message));
    }
};

export const getIsLoggedIn = () => (state: RootState) => state.auth.isLoggedIn;
export const getCurrentUserData = () => (state: RootState) =>
    state.auth.userData;
export const getIsLoadingUser = () => (state: RootState) =>
    state.auth.isLoading;
export const getAuthErrors = () => (state: RootState) => state.auth.error;
