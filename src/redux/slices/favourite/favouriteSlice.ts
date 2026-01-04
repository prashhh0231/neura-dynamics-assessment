import { createSlice } from "@reduxjs/toolkit";
import type { FavouriteProductState } from "./favourite.types";

const initialState: FavouriteProductState = {
  favProductList: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addInFavourite(state, action) {
      console.log("add favourite", action.payload);
      if (!state.favProductList.includes(action.payload)) {
        state.favProductList.push(action.payload);
      }
    },
    removeFromFavourite(state, action) {
      console.log("remove favourite", action.payload);
      state.favProductList = state.favProductList.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { addInFavourite, removeFromFavourite } = productSlice.actions;
export default productSlice.reducer;
