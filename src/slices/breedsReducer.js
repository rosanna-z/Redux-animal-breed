import { createSlice } from "@reduxjs/toolkit";

const shuffleArray = (breeds) => {
  return [...breeds].sort(() => Math.random() - 0.5);
};

const getBreedsForTable = (allBreeds) => {
  const shuffledArray = shuffleArray(allBreeds);
  const tableOneBreeds = shuffledArray.slice(0, 10);
  const tableTwoBreeds = shuffledArray.slice(10, 20);
  return { tableOneBreeds, tableTwoBreeds };
};

const breedsSlice = createSlice({
  name: "breeds",
  initialState: { tableOneBreeds: [], tableTwoBreeds: [] },
  reducers: {
    initailizeTwoTables(state, action) {
      const allBreeds = Object.keys(action.payload);
      const twoTablesBreeds = getBreedsForTable(allBreeds)
      return { ...state, ...twoTablesBreeds };
    },
  },
});

export const { initailizeTwoTables } = breedsSlice.actions;
export default breedsSlice.reducer;
