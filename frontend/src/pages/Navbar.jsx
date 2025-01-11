import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext to manage logout
import "../styles/home.css";

const Navbar = () => {
  const { logout } = useContext(AuthContext); // Get the logout function from AuthContext
  const navigate = useNavigate(); // Use navigate to redirect after logout

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">ATS Checker</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><button onClick={handleLogout} className="navbar-login">LOGIN</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
