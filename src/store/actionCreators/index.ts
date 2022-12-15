import * as ProductsActionCreators from './products';
import * as ProductActionCreators from './product';
import * as CategoryActionCreators from './category';

export default {
  ...ProductsActionCreators,
  ...CategoryActionCreators,
  ...ProductActionCreators,
};
