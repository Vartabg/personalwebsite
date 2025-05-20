import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function JetsStats() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('passing');
  const [displayType, setDisplayType] = useState('season');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`/api/jets-stats?category=${selectedCategory}&type=${displayType}`);
        setStats(response.data);
        
        // Prepare chart data
        prepareChartData(response.data);
        
        setLoading(false);
      } catch (error) {
        // Remove debug log from error
        // console.error('Error fetching Jets stats:', error);
        setError('Failed to load Jets statistics. Please try again later.');
        setLoading(false);
      }
    };

    fetchStats();
  }, [selectedCategory, displayType]);
  
  const prepareChartData = (data) => {
    if (!data || data.length === 0) {
      setChartData(null);
      return;
    }
    
    // Determine which metric to display based on category
    let metricKey;
    let metricLabel;
    
    switch (selectedCategory) {
      case 'passing':
        metricKey = 'yards';
        metricLabel = 'Passing Yards';
        break;
      case 'rushing':
        metricKey = 'yards';
        metricLabel = 'Rushing Yards';
        break;
      case 'receiving':
        metricKey = 'yards';
        metricLabel = 'Receiving Yards';
        break;
      default:
        metricKey = 'yards';
        metricLabel = 'Yards';
    }
    
    // For season type, use the most recent 5 seasons
    // For career type, use the top 5 players
    let chartItems;
    let labels;
    
    if (displayType === 'season') {
      // Sort by year descending and take first 5
      chartItems = [...data].sort((a, b) => b.year - a.year).slice(0, 5);
      labels = chartItems.map(item => `${item.year} (${item.player})`);
    } else {
      // Sort by the metric key descending and take first 5
      chartItems = [...data].sort((a, b) => b[metricKey] - a[metricKey]).slice(0, 5);
      labels = chartItems.map(item => item.player);
    }
    
    const chartConfig = {
      labels: labels,
      datasets: [
        {
          label: metricLabel,
          data: chartItems.map(item => item[metricKey]),
          backgroundColor: 'rgba(18, 87, 64, 0.6)', // Jets green
          borderColor: 'rgba(18, 87, 64, 1)',
          borderWidth: 1
        }
      ]
    };
    
    setChartData(chartConfig);
  };

  const renderColumnHeader = (key) => {
    const headers = {
      year: 'Season',
      years: 'Seasons',
      player: 'Player',
      games: 'Games',
      yards: 'Yards',
      touchdowns: 'TDs',
      interceptions: 'INTs',
      attempts: 'Attempts',
      receptions: 'Receptions',
      avg: 'Avg',
      rating: 'Rating'
    };
    
    return headers[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };
  
  const renderChart = () => {
    if (!chartData) return null;
    
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Jets ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Leaders (${displayType === 'season' ? 'Recent Seasons' : 'All-Time'})`,
          font: {
            size: 16
          }
        },
      },
    };
    
    return (
      <div className="h-80 w-full">
        <Bar options={options} data={chartData} />
      </div>
    );
  };

  const renderStats = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
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

    if (!stats || stats.length === 0) {
      return (
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
          No statistics available for this selection.
        </div>
      );
    }

    // Determine which columns to display based on category and type
    let columns = [];
    if (displayType === 'season') {
      columns = ['year', 'player'];
    } else {
      columns = ['player', 'years', 'games'];
    }
    
    // Add category-specific columns
    switch (selectedCategory) {
      case 'passing':
        columns = [...columns, 'yards', 'touchdowns', 'interceptions', 'rating'];
        break;
      case 'rushing':
        columns = [...columns, 'yards', 'touchdowns', 'attempts', 'avg'];
        break;
      case 'receiving':
        columns = [...columns, 'yards', 'touchdowns', 'receptions', 'avg'];
        break;
      default:
        columns = [...columns, 'yards', 'touchdowns'];
    }

    return (
      <>
        {/* Render the chart first */}
        <div className="mb-8">
          {renderChart()}
        </div>
        
        {/* Then render the table data */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-green-600 text-white">
                {columns.map(column => (
                  <th key={column} className="py-3 px-4 border-b text-left">
                    {renderColumnHeader(column)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  {columns.map(column => (
                    <td key={column} className="py-3 px-4 border-b">
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <div className="jets-stats">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">New York Jets Statistics</h3>
        <p className="text-gray-700 mb-6">
          Explore historical statistics for New York Jets players, including season and career leaders.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Category Selection */}
          <div className="flex-grow">
            <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-1">
              Select Category
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="passing">Passing</option>
              <option value="rushing">Rushing</option>
              <option value="receiving">Receiving</option>
            </select>
          </div>
          
          {/* Display Type Selection */}
          <div className="flex-grow">
            <label htmlFor="display-type-select" className="block text-sm font-medium text-gray-700 mb-1">
              Display Type
            </label>
            <select
              id="display-type-select"
              value={displayType}
              onChange={(e) => setDisplayType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="season">Season Leaders</option>
              <option value="career">Career Leaders</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Stats Display */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          {displayType === 'season' ? 'Season Leaders' : 'Career Leaders'}: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </h3>
        {renderStats()}
      </div>
      
      {/* Additional information section */}
      <div className="mt-10 bg-green-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-3">Jets History Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium mb-2">Team Achievements</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Super Bowl III Champions (1968 season)</li>
              <li>AFL Champions (1968)</li>
              <li>4 AFC East Division Championships</li>
              <li>14 Playoff Appearances</li>
              <li>4 Conference Championship Game Appearances</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2">Retired Jersey Numbers</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>#12 - Joe Namath (QB, 1965-1976)</li>
              <li>#13 - Don Maynard (WR, 1960-1972)</li>
              <li>#28 - Curtis Martin (RB, 1998-2006)</li>
              <li>#73 - Joe Klecko (DL, 1977-1987)</li>
              <li>#90 - Dennis Byrd (DL, 1989-1992)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JetsStats;
