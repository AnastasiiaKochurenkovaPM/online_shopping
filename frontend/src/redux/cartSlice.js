import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      // Переконаємося, що товар має id
      if (!product.id) {
        console.warn("Спроба додати товар без id:", product);
        return;
      }

      // Уникнути дублювання (опціонально)
      const exists = state.items.some(item => item.id === product.id);
      if (!exists) {
        state.items.push(product);
      }
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== idToRemove);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
