import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productSlice";
import favouriteReducer from "./slices/favourite/favouriteSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favourite: favouriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
