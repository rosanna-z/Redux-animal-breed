import { configureStore } from "@reduxjs/toolkit";
import breedsSlice from "./slices/breedsReducer";

const store = configureStore({
  reducer: {
    breeds: breedsSlice,
  },
  devTools: true,
});

export default store;
