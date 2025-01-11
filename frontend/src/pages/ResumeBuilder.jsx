import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/resumeBuilder.css"; 

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    experience: "",
    summary: "",
  });

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Resume data submitted:", formData);
    navigate("/dashboard");
  };

  const selectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="resume-builder">
      <h1>Create Your Professional Resume</h1>

      {!selectedTemplate && (
        <div className="template-selection">
          <h2>Select a Template</h2>
          <div className="template-options">
            <div className="template-card" onClick={() => selectTemplate("template1")}>
              <img src="/images/template1-preview.png" alt="Template 1" />
              <p>Modern Template</p>
            </div>
            <div className="template-card" onClick={() => selectTemplate("template2")}>
              <img src="/images/template2-preview.png" alt="Template 2" />
              <p>Classic Template</p>
            </div>
          </div>
        </div>
      )}

      {selectedTemplate && (
        <div className="resume-form-container">
          <div className="template-preview">
            {selectedTemplate === "template1" ? (
              <div className="template1-preview">
                <h3>Modern Template</h3>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Skills:</strong> {formData.skills}</p>
                <p><strong>Education:</strong> {formData.education}</p>
                <p><strong>Experience:</strong> {formData.experience}</p>
                <p><strong>Summary:</strong> {formData.summary}</p>
              </div>
            ) : (
              <div className="template2-preview">
                <h3>Classic Template</h3>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Summary:</strong> {formData.summary}</p>
                <p><strong>Skills:</strong> {formData.skills}</p>
                <p><strong>Experience:</strong> {formData.experience}</p>
                <p><strong>Education:</strong> {formData.education}</p>
              </div>
            )}
          </div>

          <div className="form-controls">
            <button onClick={toggleEdit} className="toggle-btn">
              {isEditing ? "Preview" : "Edit"}
            </button>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="resume-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Skills</label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Education</label>
                  <textarea
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Experience</label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Summary</label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Save Resume
                </button>
              </form>
            ) : (
              <button onClick={handleSubmit} className="submit-btn">
                Save Resume
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
