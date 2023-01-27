import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initailizeTwoTables } from "../slices/breedsSlice";
import axios from "axios";
import Error from "./Error";
import Button from "./Button";
import BreedsTable from "./BreedsTable";
import "./App.css";

const API = "https://dog.ceo/api/breeds/list/all";

export default function App() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.breeds);

  // Upon first render, get data from API & initialize two tables
  useEffect(() => {
    const getBreedsData = async () => {
      const response = await axios.get(API);
      return dispatch(initailizeTwoTables(response.data.message));
    };
    getBreedsData();
  }, [dispatch]);

  return (
    <div className="App">
      {error && <Error />}
      <BreedsTable />
      <Button />
    </div>
  );
};
