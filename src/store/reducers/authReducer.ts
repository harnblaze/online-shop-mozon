import localStorageService from '../../services/localStorage.service';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUsersSliceState {
  isLoading: boolean;
  error: any | null;
  userId: string;
  userEmail: string;
  isLoggedIn: boolean;
}

const initialState: IUsersSliceState = {
  isLoading: true,
  error: null,
  userId: localStorageService.getUserID(),
  userEmail: '',
  isLoggedIn: false,
};
const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequested: state => {
      state.error = null;
    },
    authRequestSuccess: (
      state,
      action: PayloadAction<{ userId: string; userEmail: string }>,
    ) => {
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreateRequested: state => {
      state.isLoading = true;
    },
    userCreateSuccess: state => {
      state.isLoading = false;
    },
    userUpdateRequested: state => {
      state.isLoading = true;
    },
    userUpdateSuccess: state => {
      state.isLoading = false;
    },
    userLoggedOut: state => {
      state.isLoggedIn = false;
      state.userId = '';
    },
  },
});

export const userCreateFailed = createAction('auth/userCreateFailed');

export const userUpdateFailed = createAction('auth/userUpdateFailed');

export const { reducer: authReducer, actions: authActions } = AuthSlice;
