import React, { useState } from 'react';
import axios from 'axios';
import { Panel } from '../layout';

function PetFinderPanel({ dimensions, navigateDirection, isActive, panelIndex, totalPanels }) {
  const [zipCode, setZipCode] = useState('');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!zipCode.match(/^\d{5}$/)) {
      setError('Please enter a valid 5-digit ZIP code');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`/api/pets?zipCode=${zipCode}`);
      setPets(response.data.animals || []);
      setSearched(true);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Failed to fetch pets. Please try again later.');
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Panel 
      title="Pet Finder"
      navigateDirection={navigateDirection}
      isActive={isActive}
      panelIndex={panelIndex}
      totalPanels={totalPanels}
    >
      <div className="h-full flex flex-col">
        {/* Search form */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <div className="flex-1">
              <label htmlFor="zip-input" className="block text-sm text-gray-700 mb-1">
                Enter ZIP Code
              </label>
              <input
                id="zip-input"
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., 90210"
                pattern="[0-9]{5}"
                maxLength="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 text-sm"
              >
                {loading ? 'Searching...' : 'Find Cats'}
              </button>
            </div>
          </div>
        </div>

        {/* Results area */}
        <div className="flex-1 overflow-auto">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {!loading && !error && pets.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mb-3">
                Cats available near {zipCode}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pets.map((pet) => (
                  <div key={pet.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                    <div className="h-40 bg-gray-200">
                      <img
                        src={pet.image || 'https://via.placeholder.com/300x200?text=No+Photo'}
                        alt={`Photo of ${pet.name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <h4 className="font-semibold text-lg">{pet.name}</h4>
                      <div className="text-sm text-gray-600 mb-2">
                        {pet.breed} • {pet.age} • {pet.gender}
                      </div>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                        {pet.description}
                      </p>
                      <button className="mt-auto px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition">
                        Contact About {pet.name}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!loading && !error && searched && pets.length === 0 && (
            <div className="text-center py-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">No cats found</h3>
              <p className="text-gray-600">Try a different ZIP code or check back later</p>
            </div>
          )}

          {!loading && !error && !searched && (
            <div className="text-center py-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Find your new cat companion</h3>
              <p className="text-gray-600">Enter your ZIP code to see cats available for adoption near you</p>
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
}

export default PetFinderPanel;
