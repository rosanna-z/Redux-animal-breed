import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initailizeTwoTables, dragAndDrop } from "./slices/breedsReducer";
import axios from "axios";
import "./App.css";

const API = "https://dog.ceo/api/breeds/list/all";

const App = () => {
  const dispatch = useDispatch();
  const { tableOneBreeds, tableTwoBreeds } = useSelector(
    (state) => state.breeds
);

  // upon first render, get data from API & initialize two tables
  useEffect(() => {
    const getBreedsData = async () => {
      const response = await axios.get(API);
      return dispatch(initailizeTwoTables(response.data.message));
    };
    getBreedsData();
  }, [dispatch]);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text", e.target.dataset.index);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropEndIndex = e.target.dataset.index;
    const dragStartIndex = e.dataTransfer.getData("text");
    dispatch(dragAndDrop({ dragStartIndex, dropEndIndex, tableOneBreeds }));
  };

  return (
    <div className="App">
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
              draggable="true"
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onDragOver={(e) => e.preventDefault()}
            >
              <td data-index={index}>{index + 1}</td>
              <td data-index={index}>{breed}</td>
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
            <tr key={breed}>
              <td>{index + 1}</td>
              <td draggable="true">{breed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
