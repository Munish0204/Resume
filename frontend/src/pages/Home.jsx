import React, { useState } from "react";
import Navbar from "./Navbar";
import "../styles/home.css";
import resumeVideo from "../assets/resume video.mp4"; // Adjust the path to your video file
import scoreVideo from "../assets/score video.mp4"; // Adjust the path to your video file

const Home = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // You can replace this with an API call to submit the form data
        alert("Thank you for contacting us!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="home-container">
            <Navbar />
            <header className="home-header">
                <h1>DreamTrail</h1>
                <p>Enhance your career prospects with our smart tools.</p>
            </header>

            <section className="home-intro">
                <div className="home-intro-content">
                    {/* Video on the left */}
                    <video 
                        src={resumeVideo} 
                        className="resume-template" 
                        autoPlay 
                        loop 
                        muted 
                        controls={false} 
                        alt="Resume Template Video"
                    />
                    
                    {/* Text content on the right */}
                    <div className="resume-template-content">
                        <h2 className="title">Professional Resume</h2>
                        <p className="description">
                            Start building your professional resume with our easy-to-use templates.
                        </p>
                        <a href="/build-resume" className="cta-btn">Build Resume</a>
                    </div>
                </div>

                <p className="platform-intro">
                    Our platform helps you build professional resumes and checks their compatibility 
                    with Applicant Tracking Systems (ATS) to ensure you stand out in job applications.
                </p>
            </section>

            <section className="home-intro">
                <div className="home-intro-content">
                    {/* Text content on the left */}
                    <div className="score-template-content">
                        <h2 className="title">ATS Scoring</h2>
                        <p className="description">
                            Check your resume's compatibility with ATS using our advanced scoring tool.
                        </p>
                        <a href="/check-score" className="cta-btn">Check Score</a>
                    </div>

                    {/* Video on the right */}
                    <video 
                        src={scoreVideo} 
                        className="score-template" 
                        autoPlay 
                        loop 
                        muted 
                        controls={false} 
                        alt="Score Template Video"
                    />
                </div>
            </section>

            <section className="home-features" id="features">
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

            <section className="about-content" id="about">
                <div className="about-mission">
                    <h1>About</h1>
                    <h2>Our Mission</h2>
                    <p>
                        At DreamTrail, our mission is to simplify the job-seeking process with
                        innovative tools that help you craft resumes, assess compatibility, and
                        achieve your career goals.
                    </p>
                </div>
                <div className="about-vision">
                    <h2>Our Vision</h2>
                    <p>
                        We envision a world where every professional has the resources to create
                        standout resumes and succeed in their job search with confidence.
                    </p>
                </div>
            </section> 

            <section className="contact-container" id="contact">
            <header className="contact-header">
                <h1>Contact Us</h1>
                <p>Have questions or need help? We're here for you!</p>
            </header>
            <section className="contact-form-section">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Enter your message"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </section>
            </section>

            <footer className="home-footer">
                <p>&copy; 2025 Dream . All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
