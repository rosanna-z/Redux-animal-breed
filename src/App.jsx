import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [breed, setBreeds] = useState({});

  const getBreeds = () => {
    return axios.get("https://dog.ceo/api/breeds/list/all")
    .then((response) => setBreeds(response.data.message))
  };

  // generates a list of 10 random breeds *** fix: duplicates ****
  const randomBreed = () => {
    let arrayofBreeds = [];
    while (arrayofBreeds.length < 10) {
      let randomBreed = Object.keys(breed)[Math.floor(Math.random() * Object.keys(breed).length + 1)]
      arrayofBreeds.push(randomBreed);
      }
      return arrayofBreeds;
    } 


  useEffect(() => {
    getBreeds();
  },[])

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
            <th>{randomBreed()}</th>
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

      <table className="table_animal-breed">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Breed 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <th>chihuahua</th>
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
}

export default App;
