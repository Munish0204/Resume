import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { toast } from "react-toastify";
import axios from "axios";
import { baseurl } from "../utils/url";
import '../styles/auth.css';

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Define state for username or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 
  const navigate = useNavigate();

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    if (!identifier || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(`${baseurl}/login/`, { identifier, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("username", res.data.username);
      toast.success("Login Successful");
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.Please Check if you Signup...!");
      toast.error(err.response?.data?.error || "Login failed.Please Check if you Signup...!");
    }
  };

  // Handle Google login response
  const handleGoogleLogin = async (response) => {
    if (response?.credential) {
      try {
        
        const res = await axios.post(`${baseurl}/google-login/`, {
          token: response.credential
        });
  
        
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("username", res.data.username);
  
        toast.success("Google Login Successful");
        navigate("/dashboard");
      } catch (err) {
        toast.error("Google login failed. Please try again.");
        console.log(err);
      }
    } else {
      toast.error("Google login failed. Please try again.");
    }
  };
  

  useEffect(() => {
    document.title = "Login";
    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${baseurl}/checkAuth/`, {
        headers: { Authorization: `Token ${token}` },
      })
        .then((res) => {
          if (res.data.message === "Authenticated") {
            localStorage.setItem("username", res.data.username);
            navigate("/dashboard");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Username or Email</label>
          <input
            type="text"
            placeholder="Enter your username or email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert("Google login failed!")}
        />

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
