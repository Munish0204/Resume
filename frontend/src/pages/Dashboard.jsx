import React from "react";
import "../styles/dashboard.css"; // Import the CSS for styling
import { Link } from "react-router-dom";
import Nav2 from "./Nav 2"; // Assuming you have Nav2 component for the Navbar

const Dashboard = () => {
  // Example user data, this could be fetched from your context or API
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePic: "https://via.placeholder.com/150", // Example profile picture
    recentResumes: [
      { title: "Software Engineer Resume", atsScore: 85 },
      { title: "Data Scientist Resume", atsScore: 90 },
    ],
    notifications: [
      "New ATS tips are available for improving your resume.",
      "Your resume submission was successful.",
    ],
    stats: {
      resumesCreated: 5,
      atsChecks: 10,
      profileCompleteness: 80, // Percentage
    },
  };

  return (
    <div className="dashboard">
      <Nav2 />
      <div className="dashboard-container">
        <main className="main-content">
          <h1>Welcome, {user.name}!</h1>
          <div className="profile-overview">
            <img src={user.profilePic} alt="Profile" className="profile-pic" />
            <div className="profile-details">
              <p>Email: {user.email}</p>
              <p>Resumes Created: {user.stats.resumesCreated}</p>
              <p>ATS Checks: {user.stats.atsChecks}</p>
              <p>Profile Completeness: {user.stats.profileCompleteness}%</p>
            </div>
          </div>

          <section className="dashboard-notifications">
            <h2>Notifications</h2>
            <ul>
              {user.notifications.map((notification, index) => (
                <li key={index}>{notification}</li>
              ))}
            </ul>
          </section>

          <section className="dashboard-activity">
            <h2>Your Recent Resumes</h2>
            <div className="resume-list">
              {user.recentResumes.map((resume, index) => (
                <div key={index} className="resume-item">
                  <h3>{resume.title}</h3>
                  <p>ATS Score: {resume.atsScore}</p>
                  <Link to="/resume-details" className="btn">View Details</Link>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-actions">
            <h2>Quick Actions</h2>
            <div className="action-links">
              <Link to="/resume-builder" className="btn">Create New Resume</Link>
              <Link to="/ats-check" className="btn">Check ATS Score</Link>
              <Link to="/profile" className="btn">Edit Profile</Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
