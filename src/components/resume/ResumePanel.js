import React, { useState } from 'react';
import { Panel } from '../layout';

function ResumePanel({ dimensions, navigateDirection, isActive, panelIndex, totalPanels }) {
  const [activeSection, setActiveSection] = useState('experience');
  
  const experience = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      responsibilities: [
        "Lead development of responsive, accessible web applications using React and TypeScript",
        "Implemented data visualization dashboards with Chart.js, improving data comprehension by 40%",
        "Mentored junior developers and conducted code reviews to maintain high code quality standards",
        "Collaborated with UX team to redesign user interfaces, resulting in 25% increase in user engagement"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "WebSolutions LLC",
      period: "2020 - 2022",
      responsibilities: [
        "Developed and maintained client websites and web applications using React, Node.js, and MongoDB",
        "Created RESTful APIs for client-server communication and third-party integrations",
        "Implemented responsive designs using Tailwind CSS and modern CSS techniques",
        "Optimized application performance, reducing load times by 30%"
      ]
    },
    {
      title: "Junior Web Developer",
      company: "Digital Creations",
      period: "2018 - 2020",
      responsibilities: [
        "Built and maintained websites for small to medium businesses using HTML, CSS, JavaScript, and PHP",
        "Collaborated with designers to implement pixel-perfect interfaces from design mockups",
        "Assisted in database design and management using MySQL",
        "Participated in client meetings to gather requirements and present development progress"
      ]
    }
  ];
  
  const education = [
    {
      degree: "Master of Computer Science",
      institution: "Tech University",
      period: "2016 - 2018",
      details: "Specialized in Web Technologies and Software Engineering. GPA: 3.8/4.0"
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "State University",
      period: "2012 - 2016",
      details: "Minored in Mathematics. GPA: 3.7/4.0. Dean's List all semesters."
    }
  ];
  
  const certifications = [
    {
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "2023",
      details: "Validated expertise in developing, deploying, and debugging cloud-based applications using AWS"
    },
    {
      name: "Professional Scrum Master I (PSM I)",
      issuer: "Scrum.org",
      date: "2022",
      details: "Demonstrated fundamental knowledge of Scrum framework and its application"
    },
    {
      name: "MongoDB Certified Developer",
      issuer: "MongoDB",
      date: "2021",
      details: "Verified expertise in building applications using MongoDB technology"
    }
  ];
  
  const renderExperience = (job, index) => (
    <div key={index} className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
          <h4 className="text-md text-gray-600">{job.company}</h4>
        </div>
        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{job.period}</span>
      </div>
      <ul className="list-disc list-inside text-sm text-gray-700 pl-2">
        {job.responsibilities.map((resp, i) => (
          <li key={i} className="mb-1">{resp}</li>
        ))}
      </ul>
    </div>
  );
  
  const renderEducation = (edu, index) => (
    <div key={index} className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
          <h4 className="text-md text-gray-600">{edu.institution}</h4>
        </div>
        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">{edu.period}</span>
      </div>
      <p className="text-sm text-gray-700">{edu.details}</p>
    </div>
  );
  
  const renderCertification = (cert, index) => (
    <div key={index} className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-md font-semibold text-gray-800">{cert.name}</h3>
        <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">{cert.date}</span>
      </div>
      <p className="text-sm text-gray-600 mb-1">Issuer: {cert.issuer}</p>
      <p className="text-sm text-gray-700">{cert.details}</p>
    </div>
  );
  
  return (
    <Panel 
      title="Resume"
      navigateDirection={navigateDirection}
      isActive={isActive}
      panelIndex={panelIndex}
      totalPanels={totalPanels}
    >
      <div className="h-full flex flex-col">
        {/* Section Navigation */}
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              activeSection === 'experience' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveSection('experience')}
          >
            Experience
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeSection === 'education' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveSection('education')}
          >
            Education
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeSection === 'certifications' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveSection('certifications')}
          >
            Certifications
          </button>
          <div className="ml-auto">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Download PDF
            </button>
          </div>
        </div>
        
        {/* Section Content */}
        <div className="flex-1 overflow-auto">
          {activeSection === 'experience' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Professional Experience</h2>
              {experience.map((job, index) => renderExperience(job, index))}
            </div>
          )}
          
          {activeSection === 'education' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2>
              {education.map((edu, index) => renderEducation(edu, index))}
            </div>
          )}
          
          {activeSection === 'certifications' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => renderCertification(cert, index))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
}

export default ResumePanel;
