import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds, setTable1 } from "./slices/breedsReducer";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();
  const allBreeds = useSelector((state) => state.breeds);
  const APIurl = "https://dog.ceo/api/breeds/list/all";

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // gets the first ten breeds from the shuffled array
  const getTenBreeds = function (allBreeds) {
    let breeds = allBreeds.breeds;
    const shuffledArray = shuffleArray(breeds);
    let tenBreeds = shuffledArray.slice(0, 10);
    return tenBreeds;
  };

  // upon first render, gets all data from API
  useEffect(() => {
    const breedsData = async () => {
      const response = await axios.get(APIurl);
      return dispatch(getBreeds(response.data.message));
    };
    breedsData();
  }, []);

  const firstTenBreeds = getTenBreeds(allBreeds)
  console.log(getTenBreeds(allBreeds))

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
          {firstTenBreeds.map((item, index) => (
            <tr>
              <th>{index + 1}</th>
              <th>{item}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
