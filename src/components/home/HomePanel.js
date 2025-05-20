import React from 'react';
import { Panel } from '../layout';

function HomePanel({ dimensions, navigateDirection, isActive, panelIndex, totalPanels }) {
  const menuItems = [
    {
      title: "Tariff Explorer",
      description: "Interactive historical tariff data visualization",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      color: "bg-blue-500",
      animation: "animate-float float-delay-1"
    },
    {
      title: "Pet Finder",
      description: "Find adoptable cats in your area",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      color: "bg-green-500",
      animation: "animate-float float-delay-2"
    },
    {
      title: "Jets Stats",
      description: "NY Jets statistics visualization",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-jets-green",
      animation: "animate-float float-delay-3"
    },
    {
      title: "Contact Me",
      description: "Get in touch for collaborations",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-purple-500",
      animation: "animate-float float-delay-4"
    }
  ];
  
  return (
    <Panel 
      title="Welcome"
      navigateDirection={navigateDirection}
      isActive={isActive}
      panelIndex={panelIndex}
      totalPanels={totalPanels}
    >
      <div className="h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-100 to-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Garo's Interactive Platform</h1>
          <p className="text-lg text-gray-700">
            Explore these floating interactive modules
          </p>
        </div>
        
        {/* Floating Menu */}
        <div className="relative w-full h-96 mb-8">
          <div className="absolute w-full h-full">
            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className={`${item.color} ${item.animation} text-white rounded-xl shadow-lg transform hover:scale-110 hover:rotate-2 transition-all duration-300 cursor-pointer`}
                  onClick={() => navigateDirection(index + 1)}
                  style={{
                    animation: `float ${4 + index}s ease-in-out infinite`
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <div className="mb-4 transform transition-transform duration-300 hover:rotate-12">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm opacity-80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-700 mb-6">
            Click on any panel above to explore, or use the navigation dots below
          </p>
          
          <button
            onClick={() => navigateDirection(1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </Panel>
  );
}

export default HomePanel;
