import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const login = () => {
    setIsAuthenticate(true);
  };
  const logout = () => {
    setIsAuthenticate(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticate, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
