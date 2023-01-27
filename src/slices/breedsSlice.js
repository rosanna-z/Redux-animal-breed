import { createSlice } from "@reduxjs/toolkit";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

// Gets two sets of breeds from shuffled array
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
      // Check if redux allows mutating?
      const newTableOne = [...state.tableOneBreeds];
      const newTableTwo = [...state.tableTwoBreeds];

      const dragStartIndex = action.payload.dragStart.index;
      const dropEndIndex = action.payload.dropEnd.index;
      const dragStartTable = parseInt(action.payload.dragStart.table);
      const dropEndTable = parseInt(action.payload.dropEnd.table);

      // Swaps two breeds within table 1
      if (dragStartTable === 1 && dropEndTable === 1) {
        [newTableOne[dragStartIndex], newTableOne[dropEndIndex]] = [
          newTableOne[dropEndIndex],
          newTableOne[dragStartIndex],
        ];
      }
      // Swaps two breeds within table 2
      else if (dragStartTable === 2 && dropEndTable === 2) {
        [newTableTwo[dragStartIndex], newTableTwo[dropEndIndex]] = [
          newTableTwo[dropEndIndex],
          newTableTwo[dragStartIndex],
        ];
      }
      // Moves specific breed from table 2 to end of table 1
      else if (dragStartTable === 2 && dropEndTable === 1) {
        // Error message if less than one breed
        if (newTableTwo.length === 1) {
          return {
            ...state,
            error: true,
          };
        }
        newTableOne.push(newTableTwo[dragStartIndex]);
        newTableTwo.splice(dragStartIndex, 1);
      }
      // Moves specific breed from table 1 to end of table 2
      else {
        // Error message if less than one breed
        if (newTableOne.length === 1) {
          return {
            ...state,
            error: true,
          };
        }
        newTableTwo.push(newTableOne[dragStartIndex]);
        newTableOne.splice(dragStartIndex, 1);
      }
      return {
        ...state,
        tableOneBreeds: newTableOne,
        tableTwoBreeds: newTableTwo,
        error: false,
      };
    },
    closeModal(state, action) {
      return { ...state, error: false };
    }
  },
});

export const { initailizeTwoTables, dragAndDrop, closeModal } = breedsSlice.actions;
export default breedsSlice.reducer;
