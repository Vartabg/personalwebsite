import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants for panel transitions
const panelVariants = {
  initial: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  }),
};

const ViewportContainer = ({ panels, initialPanelIndex = 0 }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [[activePanelIndex, direction], setPanel] = useState([initialPanelIndex, 0]);

  // Update dimensions on resize or orientation change
  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigate to a specific panel
  const navigateToPanel = (index) => {
    const newDirection = index > activePanelIndex ? 1 : -1;
    setPanel([index, newDirection]);
  };

  // Navigate to next or previous panel
  const navigateDirection = (newDirection) => {
    let newIndex = activePanelIndex + newDirection;
    
    // Loop around if we reach the end or beginning
    if (newIndex < 0) newIndex = panels.length - 1;
    else if (newIndex >= panels.length) newIndex = 0;
    
    setPanel([newIndex, newDirection]);
  };

  return (
    <div className="h-dvh w-full overflow-hidden relative">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={activePanelIndex}
          custom={direction}
          variants={panelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute top-0 left-0 h-full w-full"
        >
          {React.cloneElement(panels[activePanelIndex], { 
            dimensions,
            navigateToPanel,
            navigateDirection,
            isActive: true,
            panelIndex: activePanelIndex,
            totalPanels: panels.length
          })}
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {panels.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToPanel(index)}
            className={`w-3 h-3 rounded-full ${
              index === activePanelIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to panel ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewportContainer;
