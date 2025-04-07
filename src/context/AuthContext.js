import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));
      
      if (storedToken && storedUser) {
        setIsLoggedIn(true);
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Error loading auth data: ", error);
      logout();
    }
  }, []);

  const login = (token, userData) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoggedIn(true);
      setUser(userData);
    } catch (error) {
      console.error("Error saving auth data: ", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  const getUser = () => user; // Function to retrieve user details

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};