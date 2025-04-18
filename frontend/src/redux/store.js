import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userReducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});
