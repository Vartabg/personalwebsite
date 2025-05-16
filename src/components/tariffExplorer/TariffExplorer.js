import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart, LineElement, PointElement, BarElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import TariffTimelineChart from './TariffTimelineChart';
import EconomicImpactChart from './EconomicImpactChart';
import LegislationTimeline from './LegislationTimeline';

// Register Chart.js components
Chart.register(LineElement, PointElement, BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

function TariffExplorer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tariffData, setTariffData] = useState(null);
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedEra, setSelectedEra] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/tariff-data');
        setTariffData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tariff data:', error);
        setError('Failed to load tariff data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterDataByEra = (data, era) => {
    if (!data || era === 'all') return data;
    
    const eraRanges = {
      'founding': [1789, 1820],
      'expansion': [1821, 1860],
      'civilwar': [1861, 1865],
      'industrial': [1866, 1913],
      'depression': [1914, 1945],
      'postwar': [1946, 1970],
      'globalization': [1971, 1993],
      'modern': [1994, 2025]
    };
    
    const range = eraRanges[era];
    if (!range) return data;
    
    return data.filter(item => item.year >= range[0] && item.year <= range[1]);
  };

  const renderOverviewSection = () => {
    if (!tariffData || !tariffData.rates) return null;
    
    const filteredRates = filterDataByEra(tariffData.rates, selectedEra);
    
    return (
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">{tariffData.overview.title}</h3>
          <p className="text-gray-700 mb-6">{tariffData.overview.description}</p>
          
          {/* Main timeline chart */}
          <div className="h-96 mb-8">
            <TariffTimelineChart data={filteredRates} />
          </div>
          
          {/* Era selector */}
          <div className="flex flex-wrap justify-center gap-2 my-4">
            <button 
              onClick={() => setSelectedEra('all')}
              className={`px-3 py-1 text-sm rounded-full ${selectedEra === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              All History
            </button>
            <button 
              onClick={() => setSelectedEra('founding')}
              className={`px-3 py-1 text-sm rounded-full ${selectedEra === 'founding' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Early Republic (1789-1820)
            </button>
            <button 
              onClick={() => setSelectedEra('expansion')}
              className={`px-3 py-1 text-sm rounded-full ${selectedEra === 'expansion' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Expansion (1821-1860)
            </button>
            <button 
              onClick={() => setSelectedEra('civilwar')}
              className={`px-3 py-1 text-sm rounded-full ${selectedEra === 'civilwar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Civil War (1861-1865)
            </button>
            <button 
              onClick={() => setSelectedEra('industrial')}
              className={`px-3 py-1 text-sm rounded-full ${selectedEra === 'industrial' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Industrial (1866-1913)
            </button>
            <button 
              onClick={() => setSelectedEra('depression')}
              className={`px-3 py-1 text-sm rounded-full ${selectedEra === 'depression' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Depression Era (1914-1945)
            </button>
            <button 
              onClick={() => setSelectedEra('postwar')}
              className={`px-3 py-1 text-sm rounded-full ${selectedEra === 'postwar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Post-War (1946-1970)
            </button>
            <button 
              onClick={() => setSelectedEra('globalization')}
              className={`px-3 py-1 text-sm rounded-full ${selectedEra === 'globalization' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Globalization (1971-1993)
            </button>
            <button 
              onClick={() => setSelectedEra('modern')}
              className={`px-3 py-1 text-sm rounded-full ${selectedEra === 'modern' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Modern Era (1994-Present)
            </button>
          </div>
          
          {/* Data table */}
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Year</th>
                  <th className="py-2 px-4 border-b text-left">Administration</th>
                  <th className="py-2 px-4 border-b text-left">Rate (%)</th>
                  <th className="py-2 px-4 border-b text-left">Key Event</th>
                </tr>
              </thead>
              <tbody>
                {filteredRates.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-2 px-4 border-b">{item.year}</td>
                    <td className="py-2 px-4 border-b">{item.administration}</td>
                    <td className="py-2 px-4 border-b">{item.rate}%</td>
                    <td className="py-2 px-4 border-b">{item.keyEvent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderEconomicSection = () => {
    if (!tariffData || !tariffData.economicImpacts) return null;
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Economic Impact of Tariffs</h3>
        <p className="text-gray-700 mb-6">
          Tariffs can significantly impact economic indicators like GDP growth, employment, and consumer prices. 
          Below are key periods in U.S. tariff history and their economic impacts.
        </p>
        
        <div className="h-96 mb-8">
          <EconomicImpactChart data={tariffData.economicImpacts} />
        </div>
        
        <div className="mt-8">
          <h4 className="text-lg font-medium mb-3">Economic Impact Periods</h4>
          <div className="space-y-6">
            {tariffData.economicImpacts.map((period, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50">
                <h5 className="font-semibold text-blue-900">{period.period}: {period.tariffTrend.charAt(0).toUpperCase() + period.tariffTrend.slice(1)} Tariffs</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <span className="font-medium text-gray-700">GDP Growth:</span> {period.gdpEffect}
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium text-gray-700">Employment:</span> {period.employmentEffect}
                  </div>
                  <div className="md:col-span-3">
                    <span className="font-medium text-gray-700">Prices:</span> {period.priceEffect}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderLegislationSection = () => {
    if (!tariffData || !tariffData.keyLegislation) return null;
    
    const filteredLegislation = filterDataByEra(tariffData.keyLegislation, selectedEra);
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Key Tariff Legislation</h3>
        <p className="text-gray-700 mb-6">
          Major legislative acts have shaped U.S. tariff policy throughout history, 
          influencing trade relations, economic development, and government revenue.
        </p>
        
        <div className="h-96 mb-8">
          <LegislationTimeline data={filteredLegislation} />
        </div>
        
        <div className="mt-8">
          <h4 className="text-lg font-medium mb-3">Legislative Details</h4>
          <div className="space-y-6">
            {filteredLegislation.map((item, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-4 py-3 bg-green-50">
                <h5 className="font-semibold text-green-900">{item.name} ({item.year})</h5>
                <p className="text-gray-700 mt-1">{item.description}</p>
                <p className="text-gray-700 mt-2 italic">Impact: {item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

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
        return renderOverviewSection();
      case 'economic':
        return renderEconomicSection();
      case 'legislation':
        return renderLegislationSection();
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
          onClick={() => setSelectedView('legislation')}
          className={`px-4 py-2 rounded-md ${selectedView === 'legislation' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Key Legislation
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
