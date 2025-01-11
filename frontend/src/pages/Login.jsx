import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from "../context/AuthContext"; // Assuming you have an AuthContext for managing auth state
import '../styles/auth.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // Destructure the login function from AuthContext
  const navigate = useNavigate(); // Use navigate hook for redirection

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await login(email, password); // Assume login function handles authentication
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  // Handle Google login response
  const handleGoogleLogin = (response) => {
    // Handle Google login success
    if (response?.credential) {
      alert(`Google login successful: ${response.credential}`);
      navigate("/dashboard"); // Redirect to dashboard after Google login
    } else {
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Google Login Button */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert("Google login failed!")}
        />

        {/* Regular Login Button */}
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>

      <p>
        Don't have an account? <a href="/register">Sign up here</a>.
      </p>
    </div>
  );
};

export default Login;
