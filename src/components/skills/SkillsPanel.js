import React, { useState } from 'react';
import { Panel } from '../layout';

function SkillsPanel({ dimensions, navigateDirection, isActive, panelIndex, totalPanels }) {
  const [activeTab, setActiveTab] = useState('technical');
  
  const technicalSkills = [
    { name: "JavaScript/TypeScript", level: 90, category: "Programming Languages" },
    { name: "React.js", level: 85, category: "Frontend" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "Express", level: 80, category: "Backend" },
    { name: "MongoDB", level: 75, category: "Databases" },
    { name: "SQL", level: 80, category: "Databases" },
    { name: "HTML/CSS", level: 90, category: "Frontend" },
    { name: "Tailwind CSS", level: 85, category: "Frontend" },
    { name: "RESTful APIs", level: 85, category: "Backend" },
    { name: "Git/GitHub", level: 85, category: "Tools" },
    { name: "Data Visualization", level: 80, category: "Specialization" },
    { name: "Responsive Design", level: 90, category: "Frontend" }
  ];
  
  const softSkills = [
    { name: "Problem Solving", description: "Analytic approach to identifying root causes and developing solutions" },
    { name: "Communication", description: "Clear articulation of complex technical concepts to diverse audiences" },
    { name: "Teamwork", description: "Collaborative mindset with experience in cross-functional teams" },
    { name: "Time Management", description: "Efficient prioritization of tasks to meet deadlines" },
    { name: "Adaptability", description: "Quick learner of new technologies and methodologies" },
    { name: "Leadership", description: "Experience guiding technical projects and mentoring junior developers" }
  ];
  
  const projects = [
    {
      title: "Tariff Explorer Dashboard",
      description: "Interactive visualization of historical U.S. tariff data with economic impact analysis",
      technologies: ["React.js", "Chart.js", "Express", "Tailwind CSS"],
      highlights: ["Responsive design", "Complex data visualization", "API integration"]
    },
    {
      title: "Pet Finder Application",
      description: "Tool for finding adoptable pets by location using external API integration",
      technologies: ["React.js", "RESTful APIs", "Tailwind CSS"],
      highlights: ["Real-time data", "User-friendly interface", "Mobile responsive"]
    },
    {
      title: "Sports Statistics Dashboard",
      description: "Interactive dashboard for visualizing and analyzing sports team statistics",
      technologies: ["React.js", "Chart.js", "Node.js", "Tailwind CSS"],
      highlights: ["Dynamic data filtering", "Multiple visualization types", "Responsive design"]
    },
    {
      title: "Personal Portfolio Website",
      description: "Fully responsive personal portfolio with custom animations and interactions",
      technologies: ["React.js", "Tailwind CSS", "Framer Motion"],
      highlights: ["Custom 3D animations", "Viewport-confined panels", "Progressive disclosure"]
    }
  ];
  
  const renderSkillBar = (skill, index) => (
    <div key={index} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
        <span className="text-sm font-medium text-gray-700">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
      <span className="text-xs text-gray-500">{skill.category}</span>
    </div>
  );
  
  const renderSoftSkill = (skill, index) => (
    <div key={index} className="bg-gray-50 rounded-md p-3 mb-3">
      <h4 className="font-medium text-gray-800">{skill.name}</h4>
      <p className="text-sm text-gray-600">{skill.description}</p>
    </div>
  );
  
  const renderProject = (project, index) => (
    <div key={index} className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h4>
      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.technologies.map((tech, i) => (
          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {tech}
          </span>
        ))}
      </div>
      <div className="text-xs text-gray-700">
        <strong>Highlights:</strong> {project.highlights.join(", ")}
      </div>
    </div>
  );
  
  return (
    <Panel 
      title="Skills & Projects"
      navigateDirection={navigateDirection}
      isActive={isActive}
      panelIndex={panelIndex}
      totalPanels={totalPanels}
    >
      <div className="h-full flex flex-col">
        {/* Tab Navigation */}
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'technical' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('technical')}
          >
            Technical Skills
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'soft' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('soft')}
          >
            Soft Skills
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'projects' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'technical' && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold mb-4">Technical Expertise</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {technicalSkills.map((skill, index) => renderSkillBar(skill, index))}
              </div>
            </div>
          )}
          
          {activeTab === 'soft' && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold mb-4">Interpersonal & Professional Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {softSkills.map((skill, index) => renderSoftSkill(skill, index))}
              </div>
            </div>
          )}
          
          {activeTab === 'projects' && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => renderProject(project, index))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
}

export default SkillsPanel;
