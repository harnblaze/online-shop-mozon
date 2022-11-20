import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductActionCreators from '../store/actionCreators/product';
import { AppDispatch } from '../store';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(ProductActionCreators, dispatch);
};
