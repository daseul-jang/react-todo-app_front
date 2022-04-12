import axios from "axios";
import { API_BASE_URL } from "./app-config";

const accessToken = localStorage.getItem("ACCESS_TOKEN");

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + accessToken
  }
});

export default instance;
