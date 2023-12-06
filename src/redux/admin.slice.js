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
  },
});

export const { signin } = slice.actions;
export default slice.reducer;
