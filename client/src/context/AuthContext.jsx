import { createContext, useContext, useState } from "react";
import { authService } from "../api/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  const register = async (username, email, password) => {
    const res = await authService.register({ username, email, password });
    console.log("Register response:", res.data);
    return res.data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
