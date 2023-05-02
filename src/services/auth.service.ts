import axios from 'axios';
import localStorageService, {
  ISignInResponse,
  ISignUpResponse,
} from './localStorage.service';

export interface ISignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
export interface IUpdateUserData extends ISignUpData {
  _id: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const authService = {
  register: async (payload: ISignUpData) => {
    const url = `accounts:signUp`;
    const { data } = await httpAuth.post<ISignUpResponse>(url, {
      ...payload,
      returnSecureToken: true,
    });
    return data;
  },
  login: async (payload: ISignInData) => {
    const url = `accounts:signInWithPassword`;
    const { data } = await httpAuth.post<ISignInResponse>(url, {
      ...payload,
      returnSecureToken: true,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post<{
      refresh_token: string;
      expires_in: string;
      id_token: string;
      user_id: string;
    }>('token', {
      grant_type: 'refresh_token',
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
