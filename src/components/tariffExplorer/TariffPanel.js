import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Panel } from '../layout';
import TariffTimelineChart from './TariffTimelineChart';
import EconomicImpactChart from './EconomicImpactChart';
import LegislationTimeline from './LegislationTimeline';

function TariffPanel({ dimensions, navigateDirection, isActive, panelIndex, totalPanels }) {
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
        return renderOverviewContent();
      case 'economic':
        return renderEconomicContent();
      case 'legislation':
        return renderLegislationContent();
      default:
        return (
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
            Selected view not available.
          </div>
        );
    }
  };

  const renderOverviewContent = () => {
    if (!tariffData || !tariffData.rates) return null;
    
    const filteredRates = filterDataByEra(tariffData.rates, selectedEra);

    return (
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <p className="text-gray-700">{tariffData.overview?.description || 'Historical tariff rates in the United States.'}</p>
        </div>
        
        {/* Main timeline chart */}
        <div className="h-40 mb-4">
          <TariffTimelineChart data={filteredRates} />
        </div>
        
        {/* Era selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button 
            onClick={() => setSelectedEra('all')}
            className={`px-2 py-1 text-xs rounded-full ${selectedEra === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            All
          </button>
          <button 
            onClick={() => setSelectedEra('founding')}
            className={`px-2 py-1 text-xs rounded-full ${selectedEra === 'founding' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Early (1789-1820)
          </button>
          <button 
            onClick={() => setSelectedEra('modern')}
            className={`px-2 py-1 text-xs rounded-full ${selectedEra === 'modern' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Modern (1994+)
          </button>
        </div>
        
        {/* Data table */}
        <div className="flex-1 overflow-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="py-2 px-3 border-b text-left text-xs">Year</th>
                <th className="py-2 px-3 border-b text-left text-xs">Admin</th>
                <th className="py-2 px-3 border-b text-left text-xs">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredRates.slice(0, 10).map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-1 px-3 text-xs">{item.year}</td>
                  <td className="py-1 px-3 text-xs">{item.administration}</td>
                  <td className="py-1 px-3 text-xs">{item.rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderEconomicContent = () => {
    if (!tariffData || !tariffData.economicImpacts) return null;
    
    return (
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <p className="text-gray-700">
            Tariffs impact economic indicators like GDP growth, employment, and consumer prices.
          </p>
        </div>
        
        <div className="h-40 mb-4">
          <EconomicImpactChart data={tariffData.economicImpacts} />
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="space-y-4">
            {tariffData.economicImpacts.slice(0, 3).map((period, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                <h5 className="font-semibold text-blue-900 text-sm">
                  {period.period}: {period.tariffTrend ? (period.tariffTrend.charAt(0).toUpperCase() + period.tariffTrend.slice(1)) : ''} Tariffs
                </h5>
                {period.gdpEffect && (
                  <div className="text-xs">
                    <span className="font-medium text-gray-700">GDP:</span> {period.gdpEffect}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderLegislationContent = () => {
    if (!tariffData || !tariffData.keyLegislation) return null;
    
    const filteredLegislation = filterDataByEra(tariffData.keyLegislation, selectedEra);
    
    return (
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <p className="text-gray-700">
            Major legislative acts have shaped U.S. tariff policy throughout history.
          </p>
        </div>
        
        <div className="h-40 mb-4">
          <LegislationTimeline data={filteredLegislation} />
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="space-y-4">
            {filteredLegislation.slice(0, 5).map((item, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                <h5 className="font-semibold text-green-900 text-sm">{item.name} ({item.year})</h5>
                <p className="text-xs text-gray-700 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Panel 
      title="Tariff Explorer"
      navigateDirection={navigateDirection}
      isActive={isActive}
      panelIndex={panelIndex}
      totalPanels={totalPanels}
    >
      {/* Navigation */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedView('overview')}
          className={`px-3 py-1 text-sm rounded-md ${selectedView === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setSelectedView('economic')}
          className={`px-3 py-1 text-sm rounded-md ${selectedView === 'economic' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Economic Impact
        </button>
        <button
          onClick={() => setSelectedView('legislation')}
          className={`px-3 py-1 text-sm rounded-md ${selectedView === 'legislation' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Key Legislation
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </Panel>
  );
}

export default TariffPanel;
