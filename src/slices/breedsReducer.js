import { createSlice } from "@reduxjs/toolkit";

const breedsSlice = createSlice({
  name: "breeds",
  initialState: {breeds: []},
  reducers: {
    setBreeds(state, action) {
      const breeds = Object.keys(action.payload)
      console.log({...state, breeds});
      return {...state, breeds}
    },
  },
});

export const { setBreeds } = breedsSlice.actions;
export default breedsSlice.reducer;
