import { createSlice } from "@reduxjs/toolkit";

const breedsReducer = createSlice({
  name: "breeds",
  initialState: {},
  reducers: {
    setBreeds(state, action) {
      state.push({
        breeds: action.payload.breed,
      });
    },
  },
});

export const { setBreeds } = breedsSlice.actions;
export default breedsReducer;
