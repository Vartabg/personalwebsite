import React, { useRef, useEffect } from 'react';

const Panel = ({ 
  title, 
  children, 
  navigateDirection, 
  isActive, 
  panelIndex, 
  totalPanels,
  className = "" 
}) => {
  const panelRef = useRef(null);

  // Manage focus when panel becomes active
  useEffect(() => {
    if (isActive && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isActive]);

  return (
    <div 
      ref={panelRef} 
      tabIndex={isActive ? -1 : undefined}
      role="region"
      aria-label={`${title} panel`}
      className={`h-full w-full overflow-hidden flex flex-col ${className}`}
    >
      {/* Header section with title and navigation */}
      <div className="flex justify-between items-center p-4 bg-white/90 backdrop-blur-sm shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        
        <div className="flex space-x-2">
          {panelIndex > 0 && (
            <button 
              onClick={() => navigateDirection(-1)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              aria-label="Previous panel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          
          {panelIndex < totalPanels - 1 && (
            <button 
              onClick={() => navigateDirection(1)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              aria-label="Next panel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-hidden p-4">
        {children}
      </div>
    </div>
  );
};

export default Panel;
