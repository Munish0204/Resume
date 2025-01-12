import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/ResumeChecker.css";
import videoFile from "../assets/resume-video.mp4";

const ResumeChecker = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log("Uploaded file:", file);
    // Add logic to send the file to the backend
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handlePrivacyClick = () => {
    alert("Privacy guaranteed. Your data is safe.");
  };

  const handleDotClick = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="resume-checker-container">
      {/* Left Section */}
      <section className="resume-checker-left">
        <h1>Resume Checker</h1>
        <h2>Is your resume good enough?</h2>
        <p>
          A free and fast AI resume checker doing 16 crucial checks to ensure
          your resume is ready to perform and get you interview callbacks.
        </p>
        <div className="file-upload-box">
          <label htmlFor="resume-upload" className="upload-button">
            Upload Your Resume
          </label>
          <input
            type="file"
            id="resume-upload"
            onChange={handleFileUpload}
            accept=".pdf, .docx"
            hidden
          />
          <p>PDF & DOCX only. Max 2MB file size.</p>
        </div>
        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
      </section>

      <section className="features-container">
        <div className="features-header">
          <h2>Our AI-powered resume checker goes beyond typos and punctuation</h2>
          <p>We've built-in ChatGPT to help you create a resume that's tailored to the position you're applying for.</p>
        </div>

        <div className="checklist-container">
          <h3>Resume optimization checklist</h3>
          <p>We check for 16 crucial things across 5 different categories on your resume including content, file type, and keywords in the most important sections of your resume. Here's a full list of the checks you'll receive:</p>

          <section className="features-grid">
            {/* Add feature boxes here */}
          </section>
        </div>
      </section>

      <div className="video-container">
        <div className="video-text">
          <h4>Watch our guide to optimizing your resume</h4>
          <p>
            This video explains how our AI-driven resume checker works and how it can help you optimize your resume for better job prospects.
          </p>
        </div>
        <div className="video-section">
          <video autoPlay muted loop>
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="file-upload-container">
        <div className="upload-content">
          <h2>Get your resume score now!</h2>
          <p>
            Upload your resume and you'll get a personalized email with an actionable tasklist.
          </p>
          <div className="file-upload-box" onDrop={handleDrop} onDragOver={handleDragOver}>
            <div className="upload-icon">
              {/* Add upload icon */}
            </div>
            <button className="upload-button" onClick={handleUploadClick}>
              Upload Your Resume
            </button>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              accept=".pdf, .docx"
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <p>Drop your resume here or choose a file.</p>
            <p>PDF & DOCX only. Max 2MB file size.</p>
            <button className="privacy-button" onClick={handlePrivacyClick}>
              Privacy guaranteed
            </button>
            {selectedFile && (
              <div className="file-info">
                Selected file: {selectedFile.name} ({selectedFile.size} bytes)
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="testimonial-section">
        <div className="testimonial-content">
          <div className="main-text">
            <h2>Your resume is an extension of yourself – make one that's truly you</h2>
            <button className="build-resume-button">Build Your Resume</button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeChecker;
