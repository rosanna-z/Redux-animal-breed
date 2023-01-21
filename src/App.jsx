import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initailizeTwoTables } from "./slices/breedsReducer";
import axios from "axios";
import "./App.css";

const API = "https://dog.ceo/api/breeds/list/all";

const App = () => {
  const dispatch = useDispatch();
  const { tableOneBreeds, tableTwoBreeds } = useSelector((state) => state.breeds);

  // upon first render, get all data from API & initialize two tables
  useEffect(() => {
    const breedsData = async () => {
      const response = await axios.get(API);
      return dispatch(initailizeTwoTables(response.data.message));
    };
    breedsData();
  }, []);

  return (
    <div className="App">
      <table className="table_animal-breed">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Breed 1</th>
          </tr>
        </thead>
        <tbody>
          {tableOneBreeds.map((breed, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{breed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="table_animal-breed">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Breed 2</th>
          </tr>
        </thead>
        <tbody>
          {tableTwoBreeds.map((breed, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{breed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
