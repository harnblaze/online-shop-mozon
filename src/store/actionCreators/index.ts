import * as ProductsActionCreators from './products';

import * as CategoryActionCreators from './category';

export default {
  ...ProductsActionCreators,
  ...CategoryActionCreators,
};
