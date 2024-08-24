import React, { createContext, useState } from "react";
import { useContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [type, setType] = useState("");

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      setType(decoded.userType);
      console.log(decoded.userType);

      return decoded;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        decodeToken,
        type,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
