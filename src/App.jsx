import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initailizeTwoTables, dragAndDrop } from "./slices/breedsSlice";
import { saveAs } from "file-saver";
import axios from "axios";
import Error from "./Error";
import "./App.css";

const API = "https://dog.ceo/api/breeds/list/all";

const App = () => {
  const dispatch = useDispatch();
  const { tableOneBreeds, tableTwoBreeds, error } = useSelector(
    (state) => state.breeds
  );

  // Upon first render, get data from API & initialize two tables
  useEffect(() => {
    const getBreedsData = async () => {
      const response = await axios.get(API);
      return dispatch(initailizeTwoTables(response.data.message));
    };
    getBreedsData();
  }, [dispatch]);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/index", e.target.dataset.index);
    e.dataTransfer.setData("text/table", e.target.dataset.table);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropEndIndex = e.target.dataset.index;
    const dropEndTable = e.target.dataset.table;
    const dragStartIndex = e.dataTransfer.getData("text/index");
    const dragStartTable = e.dataTransfer.getData("text/table");
    dispatch(
      dragAndDrop({
        dragStart: {
          index: dragStartIndex,
          table: dragStartTable,
        },
        dropEnd: {
          index: dropEndIndex,
          table: dropEndTable,
        },
      })
    );
  };

  // Exports the data to JSON file
  const handleExport = (e) => {
    const dogBreeds = {};
    const breed1Total = {};
    const breed2Total = {};
    const breed1Rank = {};
    const breed2Rank = {};
    const fileName = "dogBreeds.json";

    for (let breed of tableOneBreeds) {
      console.log(breed);
      for (let rank = 1; rank < tableOneBreeds.length; rank++) {
        breed1Rank["rank" + rank] = breed;
      }
    }

    for (let breed of tableTwoBreeds) {
      console.log(breed);
      for (let rank = 1; rank < tableTwoBreeds.length; rank++) {
        breed2Rank["rank" + rank] = breed;
      }
    }

    breed1Total["breed1Total"] = tableOneBreeds.length;
    breed2Total["breed2Total"] = tableTwoBreeds.length;

    const tableTwo = { ...breed2Total, breed2Rank };
    const data = { ...breed1Total, breed1Rank, tableTwo };

    dogBreeds["dogBreeds"] = data;

    const jsonString = JSON.stringify(dogBreeds, null, 2);
    console.log(jsonString);

    const blob = new Blob([jsonString], { type: "application/json" });
    saveAs(blob, fileName, (err) => {
      if (err) throw error;
    });
    return blob;
  };

  return (
    <div className="App">
      {error && <Error />}
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Breed 1</th>
          </tr>
        </thead>
        <tbody>
          {tableOneBreeds.map((breed, index) => (
            <tr
              key={breed}
              data-index={index}
              data-table="1"
              draggable="true"
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onDragOver={(e) => e.preventDefault()}
            >
              <td data-index={index} data-table="1">
                {index + 1}
              </td>
              <td data-index={index} data-table="1">
                {breed}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Breed 2</th>
          </tr>
        </thead>
        <tbody>
          {tableTwoBreeds.map((breed, index) => (
            <tr
              key={breed}
              data-index={index}
              data-table="2"
              draggable="true"
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onDragOver={(e) => e.preventDefault()}
            >
              <td data-index={index} data-table="2">
                {index + 1}
              </td>
              <td data-index={index} data-table="2">
                {breed}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleExport}>
        Export to JSON
      </button>
    </div>
  );
};

export default App;
