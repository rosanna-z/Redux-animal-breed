import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreeds } from "./slices/breedsReducer";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();
  const URL = "https://dog.ceo/api/breeds/list/all";

  // generates a list of 10 random breeds *** fix: duplicates ****
  const randomBreeds = () => {
    let arrayofBreeds = [];
    while (arrayofBreeds.length < 10) {
      let randomBreed =
        Object.keys(breeds)[
          Math.floor(Math.random() * Object.keys(breeds).length + 1)
        ];
      arrayofBreeds.push(randomBreed);
    }
    return arrayofBreeds;
  };

  useEffect(() => {
    const breedsData = async () => {
      const response = await axios.get(URL);
      return dispatch(setBreeds(response.data.message));
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
          <tr>
            <th>1</th>
            <th>bulldog</th>
          </tr>
          <tr>
            <th>2</th>
            <th>poodle</th>
          </tr>
          <tr>
            <th>3</th>
            <th>shiba</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
