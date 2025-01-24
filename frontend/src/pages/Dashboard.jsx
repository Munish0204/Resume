import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css"; // Import the CSS for styling
import { Link } from "react-router-dom";
import Nav2 from "./Nav 2"; // Adjust the path to the correct location of Nav2 component
import { baseurl } from "../utils/url";
const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${baseurl}/dash/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}` // Adjust the token retrieval as necessary
      }
    })
      .then(response => {
        const data = response.data;
        setUser({
          id: data.user['id'],
          name: data.user['username'],
          email: data.user['email'],
          profilePic: "https://robohash.org/${user['username']}.jpg?size=200x200&set=set1&bgset=bg2",
          recentResumes: data.resumes,
          notifications: data.notifications,
          stats: {
            resumesCreated: data.stats_resumes_created,
            atsChecks: data.stats_ats_checks,
            // profileCompleteness: data.stats_profile_completeness,
          },
        });
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

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
              {/* <p>Profile Completeness: {user.stats.profileCompleteness}%</p> */}
            </div>
          </div>

          <section className="dashboard-notifications">
            <h2>Notifications</h2>
            <ul>
              {user.notifications && user.notifications.map((notification, index) => (
                <li key={index}>{notification}</li>
              ))}
            </ul>
          </section>

          <section className="dashboard-activity">
            <h2>Your Recent Resumes</h2>
            <div className="resume-list">
              {user.recentResumes && user.recentResumes.map((resume, index) => (
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
