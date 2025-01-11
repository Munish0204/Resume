import React from "react";
import Navbar from "./Navbar";
import "../styles/home.css";
import resumeTemplate from "../assets/resume-template.png.jpeg"; // Adjust the path as needed

const Home = () => {
    return (
        <div className="home-container">
            <Navbar />
            <header className="home-header">
                <h1>DreamTrail</h1>
                <p>Enhance your career prospects with our smart tools.</p>
               
            </header>

            <section className="home-intro">
            <img src={resumeTemplate} alt="Resume Template" className="resume-template" />
                    <div className="resume-template-content">
                    <h2 className="title">Professional Resume</h2>
                    <p className="description">Start building your professional resume with our easy-to-use templates.</p>
                    <a href="/build-resume" className="cta-btn">Build Resume</a>
                </div>


                <p>
                    Our platform helps you build professional resumes and checks their compatibility with Applicant Tracking Systems (ATS) to ensure you stand out in job applications.
                </p>
            </section>

            <section className="home-features">
                <h2>Features</h2>
                <div className="feature-list">
                    <div className="feature-item">
                        <h3>ATS Compatibility Check</h3>
                        <p>Ensure your resume gets past the automated filters with our ATS scoring tool.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Resume Builder</h3>
                        <p>Create tailored resumes with our easy-to-use templates and AI suggestions.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Cover Letter Assistance</h3>
                        <p>Write compelling cover letters that complement your resume.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Multilingual Support</h3>
                        <p>Build resumes in multiple languages to target global opportunities.</p>
                    </div>
                </div>
            </section>

            <section className="home-get-started">
                <h2>Get Started</h2>
                <p>
                    Begin your journey to landing your dream job. Start building your resume or checking its ATS score today!
                </p>
                <a href="/login" className="get-started-btn">Get Started</a>
            </section>

            <footer className="home-footer">
                <p>&copy; 2025 ATS Checker + Resume Builder. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;