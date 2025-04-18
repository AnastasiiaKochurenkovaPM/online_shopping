import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      AsyncStorage.setItem("user", JSON.stringify(action.payload));
    },

    clearUser: (state) => {
      state.user = "";
      AsyncStorage.removeItem("user"); 
    },

    restoreUser: (state, action) => {
      state.user = action.payload;
    },

    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      AsyncStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { setUser, clearUser, restoreUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
