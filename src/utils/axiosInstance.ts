import axios, { Axios } from "axios";
import { apiUrl } from "../constants";

const api: Axios = axios.create({
  baseURL: apiUrl,
//   timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
