import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

function TariffExplorer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tariffData, setTariffData] = useState(null);
  const [selectedView, setSelectedView] = useState('overview');

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

  const renderTariffChart = () => {
    if (!tariffData || !tariffData.rates || tariffData.rates.length === 0) {
      return null;
    }

    // Prepare chart data
    const chartData = {
      labels: tariffData.rates.map(item => item.year),
      datasets: [
        {
          label: 'Tariff Rate (%)',
          data: tariffData.rates.map(item => item.rate),
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
          pointRadius: 3,
          pointHoverRadius: 5
        }
      ]
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Tariff Rate (%)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Year'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: (tooltipItems) => {
              const index = tooltipItems[0].dataIndex;
              const year = tariffData.rates[index].year;
              const admin = tariffData.rates[index].administration;
              return `${year} (${admin})`;
            }
          }
        },
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Historical U.S. Tariff Rates',
          font: {
            size: 16
          }
        }
      }
    };

    return (
      <div className="h-80 w-full">
        <Line data={chartData} options={chartOptions} />
      </div>
    );
  };

  const renderKeyLegislation = () => {
    if (!tariffData || !tariffData.keyLegislation) {
      return null;
    }

    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Key Tariff Legislation</h3>
        <div className="space-y-4">
          {tariffData.keyLegislation.map((legislation, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r">
              <h4 className="font-medium">{legislation.name} ({legislation.year})</h4>
              <p className="text-gray-700 text-sm">{legislation.description}</p>
            </div>
          ))}
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
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{tariffData.overview.title}</h3>
            <p className="text-gray-700 mb-6">{tariffData.overview.description}</p>
            
            {renderTariffChart()}
            
            <div className="overflow-x-auto mt-8">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-2">GDP Impact</h4>
                <p className="text-gray-700 mb-4">Research shows that higher tariffs historically correlate with slower GDP growth as trade barriers reduce economic efficiency.</p>
                <div className="h-40 bg-white rounded border border-gray-200 flex items-center justify-center text-gray-500">
                  GDP correlation chart placeholder
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Employment Effects</h4>
                <p className="text-gray-700 mb-4">While tariffs can protect specific industries, they often lead to overall job losses in the broader economy.</p>
                <div className="h-40 bg-white rounded border border-gray-200 flex items-center justify-center text-gray-500">
                  Employment effect chart placeholder
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="text-lg font-medium mb-2">Consumer Price Effects</h4>
              <p className="text-gray-700 mb-4">Tariffs typically lead to higher prices for consumers as import costs rise. These effects can vary by industry and product category.</p>
              <div className="h-40 bg-white rounded border border-gray-200 flex items-center justify-center text-gray-500">
                Consumer price effect chart placeholder
              </div>
            </div>
          </div>
        );
      case 'legislation':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Tariff Legislation History</h3>
            <p className="text-gray-700 mb-6">Key legislative acts have shaped U.S. tariff policy throughout history.</p>
            
            {renderKeyLegislation()}
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
