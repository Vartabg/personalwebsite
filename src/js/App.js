import React from 'react';
import { ViewportContainer } from '../components/layout';
import TariffPanel from '../components/tariffExplorer/TariffPanel';
import PetFinderPanel from '../components/petFinder/PetFinderPanel';
import JetsStatsPanel from '../components/jetsStats/JetsStatsPanel';
import SkillsPanel from '../components/skills/SkillsPanel';
import ResumePanel from '../components/resume/ResumePanel';
import PortfolioPanel from '../components/portfolio/PortfolioPanel';
import ContactPanel from '../components/contact/ContactPanel';

const App = () => {
  // Parse the URL hash to determine the initial panel to show
  const getInitialPanelFromHash = () => {
    const hash = window.location.hash;
    if (hash === '#tariff') return 0;
    if (hash === '#pets') return 1;
    if (hash === '#jets') return 2;
    if (hash === '#skills') return 3;
    if (hash === '#resume') return 4;
    if (hash === '#portfolio') return 5;
    if (hash === '#contact') return 6;
    return 0; // Default to tariff panel if no valid hash
  };

  // Define all panels to be used in the viewport container
  const panels = [
    <TariffPanel key="tariff" />,
    <PetFinderPanel key="pets" />,
    <JetsStatsPanel key="jets" />,
    <SkillsPanel key="skills" />,
    <ResumePanel key="resume" />,
    <PortfolioPanel key="portfolio" />,
    <ContactPanel key="contact" />
  ];

  return (
    <div className="app-container h-full">
      <ViewportContainer panels={panels} initialPanelIndex={getInitialPanelFromHash()} />
    </div>
  );
};

export default App;
