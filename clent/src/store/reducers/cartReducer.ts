import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

interface ICartState {
  items: ICartItem[];
}

const initialState: ICartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    itemAdded(state, action: PayloadAction<ICartItem>) {
      const existingItem = state.items.find(
        item => item._id === action.payload._id,
      );
      if (existingItem !== undefined) {
        existingItem.quantity++;
      } else {
        state.items.push(action.payload);
      }
    },
    itemRemoved(state, action: PayloadAction<string>) {
      state.items = state.items
        .map(item => {
          if (item._id === action.payload)
            return { ...item, quantity: item.quantity - 1 };
          return item;
        })
        .filter(item => item.quantity !== 0);
    },
    cartCleared(state) {
      state.items = [];
    },
  },
});

export const { reducer: cartReducer, actions: cartActions } = cartSlice;
