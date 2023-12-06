import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    set: (state, action) => action.payload,
    delMany: (state, action) =>
      state.filter((el) => !action.payload.includes(el.id)),
  },
});

export const { set, delMany } = slice.actions;
export default slice.reducer;
