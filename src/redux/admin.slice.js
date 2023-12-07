import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "admin",
  initialState: {
    accessToken: null,
    data: null,
  },
  reducers: {
    signin: (state, action) => {
      const { accessToken, ...data } = action.payload;
      state.accessToken = accessToken;
      state.data = data;
    },
    logout: (state) => {
      (state.accessToken = null), (state.data = null);
    },
  },
});

export const { signin, logout } = slice.actions;
export default slice.reducer;
