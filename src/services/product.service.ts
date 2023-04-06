import httpService from './http.service';

const endPoint = 'product/';
const productService = {
  get: async () => {
    const { data } = await httpService.get(endPoint);
    return data;
  },
};

export default productService;
