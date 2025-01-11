import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../styles/profile.css"; // Import your custom styles

const ProfilePage = () => {
  const navigate = useNavigate(); // Initialize navigate hook for redirecting
  const [userData, setUserData] = useState({
    name: "Muneeswaran",
    email: "munishwaran@gmail.com",
    profilePic: "https://via.placeholder.com/150", // Placeholder image
    bio: "A passionate developer interested in building innovative solutions.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState({ ...userData });
  const [newProfilePic, setNewProfilePic] = useState(null); // New state for profile picture

  // Handle input change for editable fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePic(reader.result); // Set the new profile picture
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle edit mode and save changes
  const toggleEdit = () => {
    if (isEditing) {
      // Save changes and update profile picture
      setUserData({
        ...newData,
        profilePic: newProfilePic || userData.profilePic, // If new picture, update it
      });
    }
    setIsEditing(!isEditing);
  };

  // Redirect to dashboard after saving
  const handleSaveAndRedirect = () => {
    toggleEdit();
    navigate("/dashboard"); // Navigate to dashboard after saving
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      <div className="profile-card">
        <div className="profile-header">
          <img
            src={newProfilePic || userData.profilePic}
            alt="Profile"
            className="profile-pic"
          />
          {/* Conditionally render file input based on isEditing */}
          {isEditing && (
            <div>
              <input
                type="file"
                onChange={handleProfilePicChange}
                className="file-input"
              />
            </div>
          )}
          <button onClick={toggleEdit} className="edit-btn">
            {isEditing ? "" : "Edit"}
          </button>
        </div>

        <div className="profile-info">
          <div className="profile-item">
            <label>Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={newData.name}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.name}</p>
            )}
          </div>

          <div className="profile-item">
            <label>Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={newData.email}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>

          <div className="profile-item">
            <label>Bio:</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={newData.bio}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.bio}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <button onClick={handleSaveAndRedirect} className="save-btn">
            Save and Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
