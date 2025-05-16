import React, { useState } from 'react';
import axios from 'axios';

function PetFinder() {
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pets, setPets] = useState([]);
  const [searched, setSearched] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    age: '',
    size: ''
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!zipCode || !/^\d{5}$/.test(zipCode)) {
      setError('Please enter a valid 5-digit ZIP code');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      setSearched(true);
      
      // Fetch from our API
      const response = await axios.get(`/api/pets?zipCode=${zipCode}`);
      
      // Apply any active filters
      let filteredPets = response.data.animals || [];
      
      if (filters.type && filters.type !== '') {
        filteredPets = filteredPets.filter(pet => pet.type.toLowerCase() === filters.type.toLowerCase());
      }
      
      if (filters.age && filters.age !== '') {
        filteredPets = filteredPets.filter(pet => {
          // Simple age matching logic - could be more sophisticated
          const petAge = pet.age.toLowerCase();
          return petAge.includes(filters.age.toLowerCase());
        });
      }
      
      if (filters.size && filters.size !== '') {
        filteredPets = filteredPets.filter(pet => pet.size.toLowerCase() === filters.size.toLowerCase());
      }
      
      setPets(filteredPets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pets:', error);
      setError('Failed to fetch pets. Please try again later.');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderPets = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          {error}
        </div>
      );
    }

    if (!searched) {
      return (
        <div className="text-center text-gray-500 p-8">
          <i className="fas fa-search text-5xl mb-4"></i>
          <p>Enter your ZIP code to find adoptable pets near you</p>
        </div>
      );
    }

    if (pets.length === 0) {
      return (
        <div className="text-center bg-yellow-50 p-8 rounded-lg">
          <i className="fas fa-exclamation-circle text-yellow-500 text-5xl mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">No Pets Found</h3>
          <p>We couldn't find any pets available for adoption in your area.</p>
          <p className="mt-2">Try a different ZIP code or check back later.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={pet.image} 
                alt={pet.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-1">{pet.name}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-2">
                  {pet.type}
                </span>
                <span>{pet.breed}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm mb-3">
                <span>{pet.age}</span>
                <span>{pet.gender}</span>
                <span>{pet.size}</span>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-2">{pet.description}</p>
              <button className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition-colors">
                Meet {pet.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="pet-finder">
      {/* Search Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="zip-input" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Your ZIP Code
            </label>
            <input
              id="zip-input"
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="e.g., 10001"
              pattern="[0-9]{5}"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:self-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:bg-blue-300"
            >
              {loading ? 'Searching...' : 'Find Pets'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Filter Controls */}
      {searched && pets.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-gray-700 font-medium">Filter:</span>
            <select 
              name="type" 
              value={filters.type} 
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Pet Types</option>
              <option value="cat">Cats</option>
              <option value="dog">Dogs</option>
              <option value="other">Other</option>
            </select>
            <select 
              name="age" 
              value={filters.age} 
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Age</option>
              <option value="baby">Baby</option>
              <option value="young">Young</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
            <select 
              name="size" 
              value={filters.size} 
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xlarge">Extra Large</option>
            </select>
          </div>
        </div>
      )}
      
      {/* Results */}
      <div className="mt-4">
        {renderPets()}
      </div>
      
      {/* Pet Adoption Information */}
      {searched && pets.length > 0 && (
        <div className="mt-10 bg-blue-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Pet Adoption Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium mb-2">Adoption Process</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Meet the pet and complete an application</li>
                <li>Shelter staff may conduct a home check</li>
                <li>Pay adoption fees (typically $50-$250)</li>
                <li>Schedule a pick-up date</li>
                <li>Welcome your new pet home!</li>
              </ol>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2">What to Consider</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Pets are a long-term commitment</li>
                <li>Consider your living situation and space</li>
                <li>Factor in ongoing costs for food, healthcare, and supplies</li>
                <li>Ensure you have time for daily care and attention</li>
                <li>Research the specific needs of different pet breeds</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetFinder;
