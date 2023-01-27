import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import "./Button.css";

const Button = () => {
  const { tableOneBreeds, tableTwoBreeds } = useSelector(
    (state) => state.breeds
  );

  // Exports the data to JSON file
  const handleExport = () => {
    const dogBreeds = {};
    const breed1Total = {};
    const breed2Total = {};
    const breed1Rank = {};
    const breed2Rank = {};
    const fileName = "dogBreeds.json";

    for (let rank = 1; rank < tableOneBreeds.length + 1; rank++) {
      breed1Rank["rank" + rank] = tableOneBreeds[rank - 1];
    }

    for (let rank = 1; rank < tableTwoBreeds.length + 1; rank++) {
      breed2Rank["rank" + rank] = tableTwoBreeds[rank - 1];
    }

    breed1Total["breed1Total"] = tableOneBreeds.length;
    breed2Total["breed2Total"] = tableTwoBreeds.length;

    const data = { ...breed1Total, breed1Rank, ...breed2Total, breed2Rank };

    dogBreeds["dogBreeds"] = data;

    const jsonString = JSON.stringify(dogBreeds, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });

    saveAs(blob, fileName, (err) => {
      if (err) throw err;
    });

    return blob;
  };

  return (
    <button type="button" onClick={handleExport}>
      <FaDownload />
      &nbsp;Export to JSON
    </button>
  );
};

export default Button;
