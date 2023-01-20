import { configureStore } from "@reduxjs/toolkit";
import breedsReducer from "./reducer";

const store = configureStore({
  reducer: {
    breeds: breedsReducer,
  },
});

export default store;
