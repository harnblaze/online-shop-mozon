import localStorageService from '../../services/localStorage.service';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISignUpData } from '../../services/auth.service';

interface IUsersSliceState {
  isLoading: boolean;
  error: any | null;
  userId: string;
  userData: ISignUpData | null;
  isLoggedIn: boolean;
}

const initialState: IUsersSliceState =
  localStorageService.getAccessToken() !== ''
    ? {
        isLoading: true,
        error: null,
        userId: localStorageService.getUserID(),
        userData: null,
        isLoggedIn: true,
      }
    : {
        isLoading: false,
        error: null,
        userId: '',
        userData: null,
        isLoggedIn: false,
      };

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userRequested: state => {
      state.isLoading = true;
    },
    userReceived: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
      state.isLoading = false;
    },
    userRequestFailed: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequested: state => {
      state.error = null;
    },
    authRequestSuccess: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
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
      state.userData = null;
    },
  },
});

export const { reducer: authReducer, actions: authActions } = AuthSlice;
