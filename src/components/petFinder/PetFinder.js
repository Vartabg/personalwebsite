import React, { useState } from 'react';
import axios from 'axios';

function PetFinder() {
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pets, setPets] = useState([]);
  const [searched, setSearched] = useState(false);

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
      
      // In a real app, you'd fetch from your API
      // const response = await axios.get(`/api/pets?zipCode=${zipCode}`);
      // setPets(response.data);
      
      // For now, we'll use placeholder data after a brief delay
      setTimeout(() => {
        setPets([
          {
            id: 1,
            name: 'Whiskers',
            type: 'Cat',
            breed: 'Domestic Shorthair',
            age: '2 years',
            gender: 'Male',
            size: 'Medium',
            description: 'Whiskers is a playful and affectionate cat who loves attention.',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80'
          },
          {
            id: 2,
            name: 'Luna',
            type: 'Cat',
            breed: 'Siamese Mix',
            age: '1 year',
            gender: 'Female',
            size: 'Small',
            description: 'Luna is a sweet and gentle cat who enjoys cuddling.',
            image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80'
          },
          {
            id: 3,
            name: 'Oliver',
            type: 'Cat',
            breed: 'Tabby',
            age: '3 years',
            gender: 'Male',
            size: 'Large',
            description: 'Oliver is an independent and curious cat who enjoys exploring.',
            image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80'
          }
        ]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching pets:', error);
      setError('Failed to fetch pets. Please try again later.');
      setLoading(false);
    }
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
      
      {/* Filter Controls (placeholder) */}
      {searched && pets.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-gray-700 font-medium">Filter:</span>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Pet Types</option>
              <option value="cat">Cats</option>
              <option value="dog">Dogs</option>
              <option value="other">Other</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Any Age</option>
              <option value="baby">Baby</option>
              <option value="young">Young</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
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
    </div>
  );
}

export default PetFinder;
