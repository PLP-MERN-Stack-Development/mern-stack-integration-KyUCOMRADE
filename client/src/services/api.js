import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Define postService properly
export const postService = {
  getAll: async () => (await API.get("/posts")).data,
  create: async (postData) => (await API.post("/posts", postData)).data,
};

// ✅ If you have auth functions, include them here too
export const authService = {
  register: async (userData) => (await API.post("/auth/register", userData)).data,
  login: async (userData) => (await API.post("/auth/login", userData)).data,
};

export default API;
