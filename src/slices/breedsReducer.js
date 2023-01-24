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
  initialState: { tableOneBreeds: [], tableTwoBreeds: [], error: false },
  reducers: {
    initailizeTwoTables(state, action) {
      const allBreeds = Object.keys(action.payload);
      const twoTablesBreeds = getBreedsForTables(allBreeds);
      return { ...state, ...twoTablesBreeds };
    },
    dragAndDrop(state, action) {
      // check if redux allows mutating?
      const newTableOne = [...state.tableOneBreeds];
      const newTableTwo = [...state.tableTwoBreeds];

      const dragStartIndex = action.payload.dragStartIndex;
      const dropEndIndex = action.payload.dropEndIndex;
      const dragStartTable = parseInt(action.payload.dragStartTable);
      const dropEndTable = parseInt(action.payload.dropEndTable);

      if (dragStartTable === 1 && dropEndTable === 1) {
        [newTableOne[dragStartIndex], newTableOne[dropEndIndex]] = [newTableOne[dropEndIndex], newTableOne[dragStartIndex]];
      }
      else if (dragStartTable === 2 && dropEndTable === 2) {
        [newTableTwo[dragStartIndex], newTableTwo[dropEndIndex]] = [newTableTwo[dropEndIndex], newTableTwo[dragStartIndex]];
      }
      else if (dragStartTable === 2 && dropEndTable === 1) {
        if (newTableTwo.length === 1) {
          return {
            ...state, 
            error: true,
          };
        };
        newTableOne.push(newTableTwo[dragStartIndex]);
        newTableTwo.splice(dragStartIndex, 1);
      }
      else {
        if (newTableOne.length === 1) {
          return {
            ...state, 
            error: true,
          };
        };
        newTableTwo.push(newTableOne[dragStartIndex]);
        newTableOne.splice(dragStartIndex, 1);
      };
      return { ...state, tableOneBreeds: newTableOne, tableTwoBreeds: newTableTwo, error: false };
    }
  },
});

export const { initailizeTwoTables, dragAndDrop } = breedsSlice.actions;
export default breedsSlice.reducer;
