import * as ProductActionCreators from './product';
import * as CategoryActionCreators from './category';

export default {
  ...ProductActionCreators,
  ...CategoryActionCreators,
};
