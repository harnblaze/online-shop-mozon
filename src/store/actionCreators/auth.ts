import authService, {
  ISignInData,
  ISignUpData,
  IUpdateUserData,
} from '../../services/auth.service';
import { AppDispatch, RootState } from '../index';
import userService from '../../services/user.service';
import history from '../../utils/history';
import localStorageService from '../../services/localStorage.service';
import {
  authActions,
  userCreateFailed,
  userUpdateFailed,
} from '../reducers/authReducer';
import { generateAuthError } from '../../utils/generateAuthErrors';

const {
  authRequested,
  authRequestFailed,
  authRequestSuccess,
  userCreateRequested,
  userCreateSuccess,
  userUpdateRequested,
  userUpdateSuccess,
  userLoggedOut,
} = authActions;

const createUser = (payload: ISignUpData) => async (dispatch: AppDispatch) => {
  dispatch(userCreateRequested());
  try {
    const { content } = await userService.create(payload);
    dispatch(userCreateSuccess(content));
    history.push('/users');
  } catch (error: any) {
    dispatch(userCreateFailed(error.message));
  }
};

export const signIn =
  ({ payload, redirect }: { payload: ISignInData; redirect: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.login(payload);
      localStorageService.setTokens(data);
      dispatch(
        authRequestSuccess({ userId: data.localId, userEmail: data.email }),
      );
      history.push(redirect);
    } catch (e: any) {
      const { code, message } = e.response.data.error;
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
    console.log(payload);
    dispatch(authRequested());
    try {
      const data = await authService.register(payload);
      localStorageService.setTokens(data);
      dispatch(
        authRequestSuccess({ userId: data.localId, userEmail: data.email }),
      );
      void dispatch(createUser(payload));
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
      const { content } = await userService.update(payload);
      await dispatch(userUpdateSuccess(content));
      history.push(`/users/${payload._id}`);
    } catch (e: any) {
      dispatch(userUpdateFailed(e));
    }
  };

export const getIsLoggedIn = () => (state: RootState) => state.auth.isLoggedIn;
export const getUsersLoadingStatus = () => (state: RootState) =>
  state.auth.isLoading;
export const getCurrentUserId = () => (state: RootState) => state.auth.userId;
export const getCurrentUserEmail = () => (state: RootState) =>
  state.auth.userEmail;

export const getAuthErrors = () => (state: RootState) => state.auth.error;
