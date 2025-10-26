import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const authService = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
};
