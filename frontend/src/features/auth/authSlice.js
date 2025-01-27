import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") || false,
  token: localStorage.getItem("token") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      console.log(payload);
      state.isAuthenticated = true;
      state.token = payload;

      localStorage.setItem("token", payload);
      localStorage.setItem("isAuthenticated", true);
    },
    removeUser: (state) => {
      state.isAuthenticated = false;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
