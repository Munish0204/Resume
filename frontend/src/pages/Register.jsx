import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { baseurl } from "../utils/url";
import '../styles/auth.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Simulate successful registration
    setSuccess("Registration successful! Please login.");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("phone", phone);
        formData.append("email", email);

        axios.post(`${baseurl}/signup/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.data.message === "User Created Successfully") {
                toast.success("Registration Successful", { autoClose: 5000, position: "top-right" });
                onToggleFlip();
            } else {
                for (let m in res.data) {
                    toast.error(res.data[m][0], { autoClose: 5000, position: "top-right" });
                }
            }
        }).catch((err) => {
            console.log(err)
            for (let key in err.response.data) {
                toast.error(err.response.data[key], { autoClose: 5000, position: "top-right" })
            }
            if (err.response.data['message']) {
                toast.error(err.response.data['message'][0], { autoClose: 5000, position: "top-right" })
            }
        });
    }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevents the default form submission
        Submit();
    }

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
};

export default Register;
