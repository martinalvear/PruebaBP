import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Asegúrate de que sea la URL correcta
});

export default api;
