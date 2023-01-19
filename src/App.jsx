import "./App.css";

function App() {
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
