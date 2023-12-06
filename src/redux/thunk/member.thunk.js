import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../api/user.api";

export const getCurrent = createAsyncThunk(
  "member/current",
  async (data, { rejectWithValue }) => {
    const response = await userApi.getMember();
    if (!response.status) return rejectWithValue(response);
    return response.data;
  },
);
