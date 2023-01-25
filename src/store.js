import { configureStore } from "@reduxjs/toolkit";
import breedsSlice from "./slices/breedsSlice";

const store = configureStore({
  reducer: {
    breeds: breedsSlice,
  },
  devTools: true,
});

export default store;
