import { cartActions, ICartItem } from '../reducers/cartReducer';
import { AppDispatch, RootState } from '../index';

const { cartCleared, itemRemoved, itemAdded } = cartActions;

export const addItem = (item: ICartItem) => (dispatch: AppDispatch) => {
  dispatch(itemAdded(item));
};
export const removeItem = (itemId: string) => (dispatch: AppDispatch) => {
  dispatch(itemRemoved(itemId));
};
export const clearCart = () => (dispatch: AppDispatch) => {
  dispatch(cartCleared());
};

export const getCartItems = () => (state: RootState) => state.cart.items;
export const selectCartTotal = () => (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
export const selectCartItemsCount = () => (state: RootState) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
