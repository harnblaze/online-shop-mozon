export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: string[];
}

export type ISortProperty = keyof Pick<IProduct, 'rating' | 'price' | 'title'>;

export interface ISortType {
  sortName: string;
  sortProperty: ISortProperty;
}

export interface ISortPayload {
  order: boolean;
  currentSort: ISortType;
}
