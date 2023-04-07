import httpService from './http.service';

const endPoint = 'category/';
const categoryService = {
  get: async () => {
    const { data } = await httpService.get(endPoint);
    return data;
  },
};

export default categoryService;
