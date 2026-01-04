import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsApi, fetchSingleProductsApi } from "../../api/api";
import type { ProductState } from "./product.types";

const initialState: ProductState = {
  productList: [],
  productDetails: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_payload, { rejectWithValue }) => {
    try {
      const response = await fetchProductsApi();
      return response;
    } catch (error: any) {
      console.log("fetch product list errors", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleProducts = createAsyncThunk(
  "products/fetchSingle",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchSingleProductsApi(id);
      return response;
    } catch (error: any) {
      console.log("fetch product details errors", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.productList = action.payload;
      });
    builder
      .addCase(fetchSingleProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.productDetails = action.payload;
      });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
