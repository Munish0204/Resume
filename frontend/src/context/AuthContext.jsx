import React, { createContext, useState, useContext } from "react";

// Create a context for managing authentication state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Add your logic here for email/password authentication (e.g., API call)
    setUser({ email }); // Simulate setting the user data
  };

  const googleLogin = (credential) => {
    // Logic for Google login (e.g., using the credential to authenticate with your backend)
    setUser({ email: credential }); // Simulate setting user data from Google
  };

  const logout = () => {
    setUser(null); // Reset user on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
