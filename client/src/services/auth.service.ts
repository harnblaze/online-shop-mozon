import axios from 'axios';
import localStorageService, {ISignInResponse, ISignUpResponse,} from './localStorage.service';
import config from "../config";

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
    baseURL: config.apiEndpoint + "/auth/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY,
    },
});

const authService = {
    register: async (payload: ISignUpData) => {
        const url = `signUp`;
        const {data} = await httpAuth.post<ISignUpResponse>(url, {
            ...payload,
            returnSecureToken: true,
        });
        return data;
    },
    login: async (payload: ISignInData) => {
        const url = `signInWithPassword`;
        const {data} = await httpAuth.post<ISignInResponse>(url, {
            ...payload,
            returnSecureToken: true,
        });
        return data;
    },
    refresh: async () => {
        const {data} = await httpAuth.post<{
            refreshToken: string;
            expiresIn: string;
            accessToken: string;
            userId: string;
        }>('token', {
            grant_type: 'refresh_token',
            refresh_token: localStorageService.getRefreshToken(),
        });
        return data;
    },
};

export default authService;
