import httpService from './http.service';
import {IProduct} from '../types/products';

const endPoint = 'product/';
const productService = {
    get: async (): Promise<any> => {
        const {data} = await httpService.get(endPoint);
        return data;
    },
    removeProduct: async (productId: string): Promise<any> => {
        const {data} = await httpService.delete(endPoint + productId);
        return data;
    },
    createProduct: async (product: Omit<IProduct, "_id">): Promise<any> => {
        const {data} = await httpService.post(endPoint, product);
        return data;
    },
    update: async (product: IProduct): Promise<any> => {
        const {data} = await httpService.put(endPoint + product._id, product);
        return data;
    },
};

export default productService;
