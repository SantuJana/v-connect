import axios from "axios";
import { apiUrl } from "../constants";

const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

api.interceptors.request.use((confirm) => {
  const token = localStorage.getItem("token");

  if (token) {
    confirm.headers.set("authorization", `Bearer ${token}`);
  }
  if (!confirm.headers["Content-Type"]) {
    confirm.headers.set("Content-type", "application/json");
  }

  return confirm;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
