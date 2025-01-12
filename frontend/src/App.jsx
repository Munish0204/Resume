import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ResumeChecker from "./pages/ResumeChecker";
import ResumeBuilder from "./pages/ResumeBuilder";
import './styles/global.css';
import './styles/auth.css';
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the provider

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <AuthProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/build-resume"element={<ResumeBuilder/>}/>
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/check-score" element={<ResumeChecker />} />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
