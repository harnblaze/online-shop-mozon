import axios from "axios";
import configFile from "../config";
import {toast} from "react-toastify";
import localStorageService from "./localStorage.service";
import AuthService from "./auth.service";

const http = axios.create({
    baseURL: configFile.apiEndpoint,
});

http.interceptors.request.use(
    async (config): Promise<any> => {

        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url ?? "");
            const url = containSlash ? config.url?.slice(0, -1) : config.url;
            config.url = `${url ?? ''}.json`;
        }
        const expiresDate = localStorageService.getExpires();
        const refreshToken = localStorageService.getRefreshToken();
        if (refreshToken !== "" && Number(expiresDate) < Date.now()) {
            const data = await AuthService.refresh();
            localStorageService.setTokens({
                refreshToken: data.refreshToken,
                expiresIn: data.expiresIn,
                accessToken: data.accessToken,
                userId: data.userId,
            });
        }
        const accessToken = localStorageService.getAccessToken();
        if (accessToken !== undefined) {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        }


        return config;
    },
    async (error) => await Promise.reject(error)
);

const transformData = (data: any): unknown[] => {
    return Boolean(data) && data._id === undefined
        ? Object.keys(data).map((el) => ({...data[el]}))
        : data;
};

http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = {content: transformData(res.data)};
        }
        res.data = {content: res.data}
        return res;
    },
    async (error) => {
        const expectedErrors =
            error.response !== undefined &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
            toast.error("Something was wrong. Try it later");
        }
        return await Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
};

export default httpService;
