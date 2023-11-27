import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    set: (state, action) => action.payload,
    create: (state, action) => [action.payload, ...state],
    update: (state, action) => {
      state[state.findIndex((el) => el.id === action.payload.id)] =
        action.payload;
      return state;
    },
    delMany: (state, action) =>
      state.filter((el) => !action.payload.includes(el.id)),
  },
});

export const { set, create, delMany, update } = slice.actions;
export default slice.reducer;
