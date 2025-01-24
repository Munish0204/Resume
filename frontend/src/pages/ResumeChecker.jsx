import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResumeChecker.css";
import videoFile from "../assets/resume-video.mp4";
import skill from "../assets/ats.mp4";
import axios from "axios";

const ResumeChecker = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  // Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log("Uploaded file:", file);
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

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmitResume = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("resume", selectedFile);
  
    try {
      setUploadStatus("Uploading...");
  
      const token = localStorage.getItem("token");  // Dynamically fetch token 
  console.log(token)
      const response = await axios.post("http://127.0.0.1:8000/uploadRes/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${token}`, // Adjust format based on backend requirements
        },
      });
  
      if (response.status === 200) {
        setUploadStatus("Upload successful!");
        console.log("Server response:", response.data);
      } else {
        setUploadStatus("Upload failed. Please try again.");
        console.error("Error uploading file:", response.statusText);
      }
    } catch (error) {
      setUploadStatus("An error occurred during upload.");
      console.error("Error during upload:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

  return (
    <div className="resume-checker-container">
      {/* Header Section */}
      <section className="resume-checker-header">
        <h1>Resume Checker</h1>
        <h2>Is your resume good enough?</h2>
        <p>
          A free and fast AI resume checker doing 16 crucial checks to ensure
          your resume is ready to perform and get you interview callbacks.
        </p>
      </section>

      {/* Upload Section */}
      <section className="file-upload-section">
        <div
          className="file-upload-box"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <button className="upload-button" onClick={handleUploadClick}>
            Upload Your Resume
          </button>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            accept=".pdf, .docx"
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <p>Drop your resume here or choose a file.</p>
          <p>PDF & DOCX only. Max 2MB file size.</p>
          {selectedFile && (
            <div className="file-info">
              Selected file: {selectedFile.name} ({selectedFile.size} bytes)
            </div>
          )}
          <button className="privacy-button" onClick={handlePrivacyClick}>
            Privacy guaranteed
          </button>
          <button className="submit-button" onClick={handleSubmitResume}>
            Submit Resume
          </button>
          {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Our AI-powered resume checker goes beyond typos and punctuation</h2>
        <p>
          We've built-in ChatGPT to help you create a resume that's tailored to the
          position you're applying for.
        </p>
        <div className="checklist-container">
          <h3>Resume optimization checklist</h3>
          <p>
            We check for 16 crucial things across 5 different categories on your
            resume including content, file type, and keywords in the most important
            sections of your resume.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <div className="video-container">
        <div className="video-text">
          <h4>Watch our guide to optimizing your resume</h4>
          <p>
            This video explains how our AI-driven resume checker works and how it can
            help you optimize your resume for better job prospects.
          </p>
        </div>
        <div className="video-section">
          <video autoPlay muted loop>
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* ATS Compliance Section */}
      <div className="page-container">
        <div className="content-container">
          <div className="video-section">
            <video
              src={skill}
              className="video"
              autoPlay
              loop
              muted
              controls={false}
              alt="Score Template Video"
            />
          </div>
          <div className="text-section">
            <h1>Get a free ATS resume scan, powered by Artificial Intelligence</h1>
            <p>
              Companies often use Applicant Tracking Systems (ATS) to filter resumes.
              Make sure your resume is ATS compliant to avoid instant rejection.
            </p>
            <a href="#" className="cta-button">
              Start the ATS resume test »
            </a>
          </div>
        </div>
      </div>

      {/* Toolkit Section */}
      <div className="toolkit-container">
        <h2>The most complete resume toolkit</h2>

        <div className="toolkit-item">
          <h3>Targeted Resume</h3>
          <p>
            Try our resume keyword scanner which scans both your resume and the job
            description you're applying to.
          </p>
        </div>

        <div className="toolkit-item">
          <h3>LinkedIn Review</h3>
          <p>
            Get actionable insights on how to improve your LinkedIn profile by using
            our LinkedIn profile checker.
          </p>
        </div>

        <div className="toolkit-item">
          <h3>ATS Resume Templates</h3>
          <p>
            Download free ATS-friendly resume templates that are perfectly readable
            and compatible with all ATS.
          </p>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="testimonial-section">
        <h2>Your resume is an extension of yourself – make one that's truly you</h2>
        <button className="build-resume-button">Build Your Resume</button>
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
    </div>
  );
};

export default ResumeChecker;
