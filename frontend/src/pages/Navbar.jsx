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

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Dream Trail</Link>
      </div>
      <ul className="navbar-links">
        {/* Smooth scrolling links */}
        <li onClick={() => scrollToSection("features")}>Features</li>
        <li onClick={() => scrollToSection("about")}>About</li>
        <li onClick={() => scrollToSection("contact")}>Contact</li>

        {/* Logout functionality */}
        <li>
          <button onClick={handleLogout} className="navbar-login">
            LOGIN
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
