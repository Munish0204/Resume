import React, { useState } from 'react';
import '../styles/ResumeBuilder.css'; // Import your CSS

const ResumeBuilder = () => {
  const [template, setTemplate] = useState('double-column'); // Default template

  const templates = [
    { id: 'double-column', name: 'Double Column', description: 'Free, Two Column resume template. The most popular choice for most roles, including programming & marketing.', image: "double-column.jpg" }, // Replace with actual image path
    { id: 'ivy-league', name: 'Ivy League', description: 'The classic Harvard template, updated for the 21st century with a refined design that recruiters love and an optimized layout.', image: "ivy-league.jpg" }, // Replace with actual image path
    { id: 'elegant', name: 'Elegant', description: 'Elegant template with a beautiful design and compact, easy-to-read layout that highlights your strengths and achievements.', image: "elegant.jpg" }, // Replace with actual image path
  ];

  const handleTemplateSelect = (id) => {
    setTemplate(id);
  };

  return (
    <div className="resume-builder">
      <h2>Choose a Resume Template</h2>
      <div className="template-grid">
        {templates.map((t) => (
          <div
            key={t.id}
            className={`template-card ${template === t.id ? 'selected' : ''}`}
            onClick={() => handleTemplateSelect(t.id)}
          >
            <img src={t.image} alt={t.name} />
            <h3>{t.name}</h3>
            <p>{t.description}</p>
            <button>Customize This Template</button>
          </div>
        ))}
      </div>
      {/*Preview Area (Simplified)*/}
      <div className="preview-area">
        <h3>Preview (Simplified)</h3>
        <p>Selected Template: {template}</p>
        {/* In a real application, you would render a dynamic preview here based on the selected template and user input */}
      </div>
    </div>
  );
};

export default ResumeBuilder;