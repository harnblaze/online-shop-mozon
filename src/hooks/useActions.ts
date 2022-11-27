import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppDispatch } from '../store';
import ActionCreators from '../store/actionCreators/';

export const useActions = (): typeof ActionCreators => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(ActionCreators, dispatch);
};
