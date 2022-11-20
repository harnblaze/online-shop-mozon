import { IProduct } from './product';

interface IResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}
export default IResponse;
