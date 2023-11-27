import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "memberUser",
  initialState: {
    data: null,
  },
  reducers: {
    signin: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { signin } = slice.actions;
export default slice.reducer;
