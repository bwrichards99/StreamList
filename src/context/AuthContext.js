import { createContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setUserToken(storedToken);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("userToken", token);
    setUserToken(token);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
