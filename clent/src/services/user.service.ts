import httpService from './http.service';
import localStorageService from './localStorage.service';
import {ISignUpData, IUpdateUserData} from './auth.service';

const endPoint = 'user/';
const userService = {
    create: async (payload: ISignUpData) => {
        const {data} = await httpService.put(
            `${endPoint}${localStorageService.getUserID()}`,
            payload,
        );
        return data;
    },
    getCurrentUser: async () => {
        if (localStorageService.getUserID() === '') return null
        const {data} = await httpService.get(
            endPoint + localStorageService.getUserID(),
        )

        return data;
    },
    update: async (payload: IUpdateUserData) => {
        const {data} = await httpService.put(
            `${endPoint}${payload._id}`,
            payload,
        );
        return data;
    },
};

export default userService;
