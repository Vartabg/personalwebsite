import React, { useState } from 'react';
import { Panel } from '../layout';

function PortfolioPanel({ dimensions, navigateDirection, isActive, panelIndex, totalPanels }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const projects = [
    {
      id: 1,
      title: "Financial Dashboard",
      category: "Data Visualization",
      image: "https://source.unsplash.com/random/800x600/?dashboard",
      technologies: ["React", "D3.js", "Redux", "Node.js"],
      description: "An interactive financial dashboard displaying real-time market data with customizable charts and filters.",
      highlights: [
        "Real-time data integration with WebSockets",
        "Interactive visualizations with D3.js",
        "Fully responsive design for desktop and mobile",
        "User preference saving with JWT authentication"
      ],
      link: "#"
    },
    {
      id: 2,
      title: "E-commerce Platform",
      category: "Web Development",
      image: "https://source.unsplash.com/random/800x600/?ecommerce",
      technologies: ["React", "Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
      description: "A full-featured e-commerce platform with product catalog, shopping cart, and secure payment processing.",
      highlights: [
        "Server-side rendering for SEO optimization",
        "Stripe integration for payment processing",
        "User authentication and profile management",
        "Advanced filtering and search functionality"
      ],
      link: "#"
    },
    {
      id: 3,
      title: "Task Management App",
      category: "Web Development",
      image: "https://source.unsplash.com/random/800x600/?tasks",
      technologies: ["React", "Firebase", "Material UI"],
      description: "A collaborative task management application with real-time updates and team functionality.",
      highlights: [
        "Real-time data synchronization with Firebase",
        "Drag-and-drop interface for task organization",
        "Team collaboration features with permissions",
        "Mobile responsive design with offline support"
      ],
      link: "#"
    },
    {
      id: 4,
      title: "Health Metrics Tracker",
      category: "Data Visualization",
      image: "https://source.unsplash.com/random/800x600/?health",
      technologies: ["React Native", "Chart.js", "Express", "MongoDB"],
      description: "A cross-platform mobile application for tracking health metrics with visualization and goal setting.",
      highlights: [
        "Custom chart components for data visualization",
        "Secure user authentication and data privacy",
        "Goal setting and achievement tracking",
        "Health insights and trend analysis"
      ],
      link: "#"
    },
    {
      id: 5,
      title: "Smart Home Controller",
      category: "IoT",
      image: "https://source.unsplash.com/random/800x600/?smarthome",
      technologies: ["React", "Node.js", "MQTT", "Socket.io"],
      description: "A web-based dashboard for controlling and monitoring smart home devices with real-time updates.",
      highlights: [
        "Real-time device status monitoring",
        "Automated routines and scheduling",
        "Energy usage analytics and optimization",
        "Integration with multiple IoT protocols"
      ],
      link: "#"
    },
    {
      id: 6,
      title: "Language Learning Platform",
      category: "Education",
      image: "https://source.unsplash.com/random/800x600/?learning",
      technologies: ["React", "Express", "MongoDB", "Socket.io"],
      description: "An interactive platform for language learning with speech recognition and progress tracking.",
      highlights: [
        "Speech recognition for pronunciation practice",
        "Adaptive learning path based on user progress",
        "Interactive exercises and quizzes",
        "Gamification elements for motivation"
      ],
      link: "#"
    }
  ];
  
  const categories = ['all', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };
  
  const closeProjectDetails = () => {
    setSelectedProject(null);
  };
  
  const renderProjectCard = (project) => (
    <div 
      key={project.id} 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-105"
      onClick={() => openProjectDetails(project)}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full mb-2">
          {project.category}
        </span>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
  
  const renderProjectDetails = () => {
    if (!selectedProject) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <div className="h-64 overflow-hidden">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <button 
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-70"
              onClick={closeProjectDetails}
            >
              ×
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedProject.title}</h2>
                <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                  {selectedProject.category}
                </span>
              </div>
              <a 
                href={selectedProject.link} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Project
              </a>
            </div>
            
            <p className="text-gray-700 mb-6">{selectedProject.description}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Key Highlights</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {selectedProject.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <Panel 
      title="Portfolio"
      navigateDirection={navigateDirection}
      isActive={isActive}
      panelIndex={panelIndex}
      totalPanels={totalPanels}
    >
      <div className="h-full flex flex-col">
        {/* Category Filter */}
        <div className="flex overflow-x-auto space-x-2 pb-4 mb-4">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map(project => renderProjectCard(project))}
          </div>
        </div>
        
        {/* Project Details Modal */}
        {renderProjectDetails()}
      </div>
    </Panel>
  );
}

export default PortfolioPanel;
