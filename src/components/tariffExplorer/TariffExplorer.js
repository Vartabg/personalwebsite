import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TariffExplorer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tariffData, setTariffData] = useState(null);
  const [selectedView, setSelectedView] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from your API
        // const response = await axios.get('/api/tariff-data');
        // setTariffData(response.data);
        
        // For now, we'll use placeholder data
        setTimeout(() => {
          setTariffData({
            overview: {
              title: 'U.S. Tariff Rates (1789-Present)',
              description: 'Historical tariff rates in the United States have varied significantly over time, influenced by economic policies, wars, and global trade relations.'
            },
            rates: [
              { year: 1789, rate: 8.0, administration: 'Washington' },
              { year: 1800, rate: 10.0, administration: 'Adams' },
              { year: 1820, rate: 40.0, administration: 'Monroe' },
              { year: 1832, rate: 33.0, administration: 'Jackson' },
              { year: 1860, rate: 18.0, administration: 'Buchanan' },
              { year: 1870, rate: 44.0, administration: 'Grant' },
              { year: 1890, rate: 48.0, administration: 'Harrison' },
              { year: 1910, rate: 21.0, administration: 'Taft' },
              { year: 1922, rate: 38.0, administration: 'Harding' },
              { year: 1930, rate: 59.0, administration: 'Hoover' },
              { year: 1940, rate: 37.0, administration: 'Roosevelt' },
              { year: 1950, rate: 13.0, administration: 'Truman' },
              { year: 1970, rate: 10.0, administration: 'Nixon' },
              { year: 1990, rate: 5.0, administration: 'Bush' },
              { year: 2000, rate: 3.0, administration: 'Clinton' },
              { year: 2010, rate: 3.5, administration: 'Obama' },
              { year: 2020, rate: 13.0, administration: 'Trump' },
              { year: 2022, rate: 7.5, administration: 'Biden' }
            ]
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching tariff data:', error);
        setError('Failed to load tariff data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
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

    if (!tariffData) {
      return (
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
          No tariff data available.
        </div>
      );
    }

    switch (selectedView) {
      case 'overview':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{tariffData.overview.title}</h3>
            <p className="text-gray-700 mb-6">{tariffData.overview.description}</p>
            
            {/* Simple Chart Placeholder */}
            <div className="relative h-64 bg-blue-50 rounded-lg p-4 mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">Chart visualization will be implemented here</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Year</th>
                    <th className="py-2 px-4 border-b">Administration</th>
                    <th className="py-2 px-4 border-b">Rate (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {tariffData.rates.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border-b">{item.year}</td>
                      <td className="py-2 px-4 border-b">{item.administration}</td>
                      <td className="py-2 px-4 border-b">{item.rate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'economic':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Economic Impact of Tariffs</h3>
            <p className="text-gray-700 mb-6">Tariffs can significantly impact economic indicators like GDP, employment, and consumer prices.</p>
            <div className="bg-blue-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">Economic impact visualizations will be implemented here.</p>
            </div>
          </div>
        );
      case 'presidential':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Presidential Tariff Policies</h3>
            <p className="text-gray-700 mb-6">Different administrations have taken varying approaches to tariff policy throughout U.S. history.</p>
            <div className="bg-blue-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">Presidential policy comparisons will be implemented here.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
            Selected view not available.
          </div>
        );
    }
  };

  return (
    <div className="tariff-explorer">
      {/* Navigation */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedView('overview')}
          className={`px-4 py-2 rounded-md ${selectedView === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setSelectedView('economic')}
          className={`px-4 py-2 rounded-md ${selectedView === 'economic' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Economic Impact
        </button>
        <button
          onClick={() => setSelectedView('presidential')}
          className={`px-4 py-2 rounded-md ${selectedView === 'presidential' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Presidential Policies
        </button>
      </div>
      
      {/* Content */}
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
}

export default TariffExplorer;
