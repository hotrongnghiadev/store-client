import { createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../../api/product.api";

export const getCurrent = createAsyncThunk(
  "products/filter",
  async (data, { rejectWithValue }) => {
    const response = await productApi.filter(data);
    if (!response.status) return rejectWithValue(response);
    return response.data.data;
  },
);
