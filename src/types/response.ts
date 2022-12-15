import { IProduct } from './products';

interface IResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}
export default IResponse;
