import axios from "axios";
import { API_BASE_URL } from "./app-config";

export default axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN")
  }
});