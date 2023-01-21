import { createSlice } from "@reduxjs/toolkit";

const breedsSlice = createSlice({
  name: "breeds",
  initialState: { breeds: [] },
  reducers: {
    getBreeds(state, action) {
      const breeds = Object.keys(action.payload);
      return { ...state, breeds };
    },
    setTable1(state, action) {
      const tenBreeds = action.payload;
      console.log(tenBreeds);
      // return { ...state, tenBreeds };
    },
  },
});

export const { getBreeds, setTable1 } = breedsSlice.actions;
export default breedsSlice.reducer;
