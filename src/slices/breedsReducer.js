import { createSlice } from "@reduxjs/toolkit";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getBreedsForTables = (allBreeds) => {
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
      const twoTablesBreeds = getBreedsForTables(allBreeds);
      return { ...state, ...twoTablesBreeds };
    },
    dragAndDrop(state, action) {
      const tableOne = action.payload.tableOneBreeds;
      const newTableOne = [...tableOne]
      const dragStartIndex = action.payload.dragStartIndex;
      const dropEndIndex = action.payload.dropEndIndex;

      [newTableOne[dragStartIndex], newTableOne[dropEndIndex]] = [newTableOne[dropEndIndex], newTableOne[dragStartIndex]];
      console.log("newTableOne", newTableOne);

      return { ...state, tableOneBreeds: newTableOne };
    }
  },
});

export const { initailizeTwoTables, dragAndDrop } = breedsSlice.actions;
export default breedsSlice.reducer;
