import axios from "axios";

export const API = axios.create({
  baseURL: "https://daws-backend.onrender.com",
});
