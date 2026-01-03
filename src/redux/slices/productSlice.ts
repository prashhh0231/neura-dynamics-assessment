import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsApi } from "../../api/api";
import type { ProductState } from "./product.types";

const initialState: ProductState = {
  productList: [],
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
      console.log("forgotPassword errors", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch(state, action) {
      //   state.search = action.payload;
    },
    setCategory(state, action) {
      //   state.category = action.payload;
    },
    setSort(state, action) {
      //   state.sort = action.payload;
    },
  },
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
  },
});

export const { setSearch, setCategory, setSort } = productSlice.actions;
export default productSlice.reducer;
