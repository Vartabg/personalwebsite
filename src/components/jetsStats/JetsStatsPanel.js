import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Panel } from '../layout';
import { Line, Bar } from 'react-chartjs-2';

function JetsStatsPanel({ dimensions, navigateDirection, isActive, panelIndex, totalPanels }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statsData, setStatsData] = useState([]);
  const [category, setCategory] = useState('passing');
  const [timeframe, setTimeframe] = useState('season');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`/api/jets-stats?category=${category}&type=${timeframe}`);
        setStatsData(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Jets stats:', err);
        setError('Failed to load stats. Please try again later.');
        setLoading(false);
      }
    };

    fetchStats();
  }, [category, timeframe]);

  const renderChart = () => {
    if (!statsData || statsData.length === 0) return null;

    // Handle season data
    if (timeframe === 'season') {
      const chartData = {
        labels: statsData.map(stat => stat.year),
        datasets: [
          {
            label: category === 'passing' ? 'Passing Yards' : 
                  category === 'rushing' ? 'Rushing Yards' : 'Receiving Yards',
            data: statsData.map(stat => stat.yards),
            backgroundColor: 'rgba(18, 87, 64, 0.2)',
            borderColor: '#125740',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#125740',
          }
        ]
      };

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const stat = statsData[context.dataIndex];
                return [
                  `${stat.player}: ${stat.yards} yards`,
                  `${category === 'passing' ? 'TDs: ' + stat.touchdowns : 
                     category === 'rushing' ? 'Attempts: ' + stat.attempts : 
                     'Receptions: ' + stat.receptions}`
                ];
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Yards'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Year'
            }
          }
        }
      };

      return (
        <div className="h-40">
          <Line data={chartData} options={chartOptions} />
        </div>
      );
    }
    
    // Handle career data
    else {
      const chartData = {
        labels: statsData.map(stat => stat.player),
        datasets: [
          {
            label: category === 'passing' ? 'Career Passing Yards' : 
                  category === 'rushing' ? 'Career Rushing Yards' : 'Career Receiving Yards',
            data: statsData.map(stat => stat.yards),
            backgroundColor: statsData.map(() => '#125740'),
            borderColor: '#000000',
            borderWidth: 1,
          }
        ]
      };

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const stat = statsData[context.dataIndex];
                return [
                  `Years: ${stat.years}`,
                  `Yards: ${stat.yards}`,
                  `${category === 'passing' ? 'TDs: ' + stat.touchdowns : 
                     category === 'rushing' ? 'Attempts: ' + stat.attempts : 
                     'Receptions: ' + stat.receptions}`
                ];
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Yards'
            }
          }
        }
      };

      return (
        <div className="h-40">
          <Bar data={chartData} options={chartOptions} />
        </div>
      );
    }
  };

  const renderStatsTable = () => {
    if (!statsData || statsData.length === 0) return null;

    // Different table structure based on category and timeframe
    if (category === 'passing') {
      return (
        <table className="min-w-full bg-white border border-gray-200 text-xs">
          <thead className="bg-gray-100">
            <tr>
              {timeframe === 'season' ? <th className="py-1 px-2 border-b">Year</th> : <th className="py-1 px-2 border-b">Player</th>}
              {timeframe === 'career' && <th className="py-1 px-2 border-b">Years</th>}
              <th className="py-1 px-2 border-b">Yards</th>
              <th className="py-1 px-2 border-b">TDs</th>
              <th className="py-1 px-2 border-b">INTs</th>
              <th className="py-1 px-2 border-b">Rating</th>
            </tr>
          </thead>
          <tbody>
            {statsData.map((stat, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
                {timeframe === 'season' ? <td className="py-1 px-2 border-b">{stat.year}</td> : <td className="py-1 px-2 border-b">{stat.player}</td>}
                {timeframe === 'career' && <td className="py-1 px-2 border-b">{stat.years}</td>}
                <td className="py-1 px-2 border-b">{stat.yards}</td>
                <td className="py-1 px-2 border-b">{stat.touchdowns}</td>
                <td className="py-1 px-2 border-b">{stat.interceptions}</td>
                <td className="py-1 px-2 border-b">{stat.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (category === 'rushing') {
      return (
        <table className="min-w-full bg-white border border-gray-200 text-xs">
          <thead className="bg-gray-100">
            <tr>
              {timeframe === 'season' ? <th className="py-1 px-2 border-b">Year</th> : <th className="py-1 px-2 border-b">Player</th>}
              {timeframe === 'career' && <th className="py-1 px-2 border-b">Years</th>}
              <th className="py-1 px-2 border-b">Yards</th>
              <th className="py-1 px-2 border-b">TDs</th>
              <th className="py-1 px-2 border-b">Attempts</th>
              <th className="py-1 px-2 border-b">Avg</th>
            </tr>
          </thead>
          <tbody>
            {statsData.map((stat, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
                {timeframe === 'season' ? <td className="py-1 px-2 border-b">{stat.year}</td> : <td className="py-1 px-2 border-b">{stat.player}</td>}
                {timeframe === 'career' && <td className="py-1 px-2 border-b">{stat.years}</td>}
                <td className="py-1 px-2 border-b">{stat.yards}</td>
                <td className="py-1 px-2 border-b">{stat.touchdowns}</td>
                <td className="py-1 px-2 border-b">{stat.attempts}</td>
                <td className="py-1 px-2 border-b">{stat.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return (
        <table className="min-w-full bg-white border border-gray-200 text-xs">
          <thead className="bg-gray-100">
            <tr>
              {timeframe === 'season' ? <th className="py-1 px-2 border-b">Year</th> : <th className="py-1 px-2 border-b">Player</th>}
              {timeframe === 'career' && <th className="py-1 px-2 border-b">Years</th>}
              <th className="py-1 px-2 border-b">Yards</th>
              <th className="py-1 px-2 border-b">TDs</th>
              <th className="py-1 px-2 border-b">Receptions</th>
              <th className="py-1 px-2 border-b">Avg</th>
            </tr>
          </thead>
          <tbody>
            {statsData.map((stat, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
                {timeframe === 'season' ? <td className="py-1 px-2 border-b">{stat.year}</td> : <td className="py-1 px-2 border-b">{stat.player}</td>}
                {timeframe === 'career' && <td className="py-1 px-2 border-b">{stat.years}</td>}
                <td className="py-1 px-2 border-b">{stat.yards}</td>
                <td className="py-1 px-2 border-b">{stat.touchdowns}</td>
                <td className="py-1 px-2 border-b">{stat.receptions}</td>
                <td className="py-1 px-2 border-b">{stat.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <Panel 
      title="NY Jets Stats"
      navigateDirection={navigateDirection}
      isActive={isActive}
      panelIndex={panelIndex}
      totalPanels={totalPanels}
    >
      <div className="h-full flex flex-col">
        {/* Controls */}
        <div className="mb-4 flex flex-wrap gap-2">
          <div className="space-x-1">
            <button
              onClick={() => setCategory('passing')}
              className={`px-2 py-1 text-xs rounded ${category === 'passing' ? 'bg-jets-green text-white' : 'bg-gray-200'}`}
            >
              Passing
            </button>
            <button
              onClick={() => setCategory('rushing')}
              className={`px-2 py-1 text-xs rounded ${category === 'rushing' ? 'bg-jets-green text-white' : 'bg-gray-200'}`}
            >
              Rushing
            </button>
            <button
              onClick={() => setCategory('receiving')}
              className={`px-2 py-1 text-xs rounded ${category === 'receiving' ? 'bg-jets-green text-white' : 'bg-gray-200'}`}
            >
              Receiving
            </button>
          </div>
          
          <div className="ml-auto space-x-1">
            <button
              onClick={() => setTimeframe('season')}
              className={`px-2 py-1 text-xs rounded ${timeframe === 'season' ? 'bg-jets-green text-white' : 'bg-gray-200'}`}
            >
              By Season
            </button>
            <button
              onClick={() => setTimeframe('career')}
              className={`px-2 py-1 text-xs rounded ${timeframe === 'career' ? 'bg-jets-green text-white' : 'bg-gray-200'}`}
            >
              Career
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-jets-green"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-3 rounded-md">
              {error}
            </div>
          ) : (
            <>
              {renderChart()}
              <div className="flex-1 overflow-auto mt-4">
                {renderStatsTable()}
              </div>
            </>
          )}
        </div>
      </div>
    </Panel>
  );
}

export default JetsStatsPanel;
