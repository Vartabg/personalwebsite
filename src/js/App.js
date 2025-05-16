import React, { useState } from 'react';
import TariffExplorer from '../components/tariffExplorer/TariffExplorer';
import PetFinder from '../components/petFinder/PetFinder';
import JetsStats from '../components/jetsStats/JetsStats';
import ContactForm from '../components/ContactForm';

function App() {
  const [activeSection, setActiveSection] = useState('tariff');
  
  // Get hash from URL on initial load
  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['tariff', 'pets', 'jets', 'contact'].includes(hash)) {
      setActiveSection(hash);
    }
    
    // Add hash change listener
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash && ['tariff', 'pets', 'jets', 'contact'].includes(newHash)) {
        setActiveSection(newHash);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  return (
    <div className="app-container">
      {/* Intro Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 mb-12 rounded-lg shadow-xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to My Multi-App Platform</h1>
          <p className="text-xl mb-8">Explore tariff data, find pets, and check Jets statistics all in one place</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#tariff" className="btn bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-full font-semibold transition">
              Tariff Explorer
            </a>
            <a href="#pets" className="btn bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-full font-semibold transition">
              Pet Finder
            </a>
            <a href="#jets" className="btn bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-full font-semibold transition">
              Jets Stats
            </a>
          </div>
        </div>
      </section>
      
      {/* Tariff Explorer Section */}
      <section id="tariff" className={`app-section ${activeSection === 'tariff' ? 'fade-in' : 'hidden'}`}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Tariff Explorer</h2>
        <TariffExplorer />
      </section>
      
      {/* Pet Finder Section */}
      <section id="pets" className={`app-section ${activeSection === 'pets' ? 'fade-in' : 'hidden'}`}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Pet Finder</h2>
        <PetFinder />
      </section>
      
      {/* Jets Stats Section */}
      <section id="jets" className={`app-section ${activeSection === 'jets' ? 'fade-in' : 'hidden'}`}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Jets Statistics</h2>
        <JetsStats />
      </section>
      
      {/* Contact Section */}
      <section id="contact" className={`app-section ${activeSection === 'contact' ? 'fade-in' : 'hidden'}`}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Contact Me</h2>
        <ContactForm />
      </section>
    </div>
  );
}

export default App;
