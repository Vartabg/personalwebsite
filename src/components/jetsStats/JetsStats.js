import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JetsStats() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('passing');
  const [displayType, setDisplayType] = useState('season');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, you'd fetch from your API
        // const response = await axios.get(`/api/jets-stats?category=${selectedCategory}&type=${displayType}`);
        // setStats(response.data);
        
        // For now, use placeholder data after a brief delay
        setTimeout(() => {
          // Simulate different stats based on selection
          const dummyStats = {
            passing: {
              season: [
                { year: 2022, player: 'Zach Wilson', yards: 1688, touchdowns: 6, interceptions: 7, rating: 72.8 },
                { year: 2021, player: 'Zach Wilson', yards: 2334, touchdowns: 9, interceptions: 11, rating: 69.7 },
                { year: 2020, player: 'Sam Darnold', yards: 2208, touchdowns: 9, interceptions: 11, rating: 72.7 },
                { year: 2019, player: 'Sam Darnold', yards: 3024, touchdowns: 19, interceptions: 13, rating: 84.3 },
                { year: 2018, player: 'Sam Darnold', yards: 2865, touchdowns: 17, interceptions: 15, rating: 77.6 },
                { year: 2017, player: 'Josh McCown', yards: 2926, touchdowns: 18, interceptions: 9, rating: 94.5 },
                { year: 2016, player: 'Ryan Fitzpatrick', yards: 2710, touchdowns: 12, interceptions: 17, rating: 69.6 },
                { year: 2015, player: 'Ryan Fitzpatrick', yards: 3905, touchdowns: 31, interceptions: 15, rating: 88.0 },
                { year: 2014, player: 'Geno Smith', yards: 2525, touchdowns: 13, interceptions: 13, rating: 77.5 },
                { year: 2013, player: 'Geno Smith', yards: 3046, touchdowns: 12, interceptions: 21, rating: 66.5 }
              ],
              career: [
                { player: 'Joe Namath', years: '1965-1976', games: 140, yards: 27057, touchdowns: 170, interceptions: 215, rating: 65.5 },
                { player: 'Ken O\'Brien', years: '1983-1992', games: 124, yards: 24386, touchdowns: 124, interceptions: 101, rating: 80.4 },
                { player: 'Vinny Testaverde', years: '1998-2005', games: 99, yards: 21022, touchdowns: 118, interceptions: 105, rating: 78.8 },
                { player: 'Richard Todd', years: '1976-1984', games: 119, yards: 18989, touchdowns: 110, interceptions: 138, rating: 67.6 },
                { player: 'Chad Pennington', years: '2000-2007', games: 69, yards: 13738, touchdowns: 82, interceptions: 55, rating: 88.9 },
                { player: 'Mark Sanchez', years: '2009-2013', games: 62, yards: 12092, touchdowns: 68, interceptions: 69, rating: 71.7 },
                { player: 'Ryan Fitzpatrick', years: '2015-2016', games: 30, yards: 6615, touchdowns: 43, interceptions: 32, rating: 78.8 },
                { player: 'Boomer Esiason', years: '1993-1995', games: 42, yards: 6419, touchdowns: 49, interceptions: 39, rating: 82.4 },
                { player: 'Sam Darnold', years: '2018-2020', games: 38, yards: 8097, touchdowns: 45, interceptions: 39, rating: 78.6 },
                { player: 'Geno Smith', years: '2013-2016', games: 33, yards: 5962, touchdowns: 28, interceptions: 36, rating: 72.4 }
              ]
            },
            rushing: {
              season: [
                { year: 2022, player: 'Breece Hall', yards: 463, touchdowns: 4, attempts: 80, avg: 5.8 },
                { year: 2021, player: 'Michael Carter', yards: 639, touchdowns: 4, attempts: 147, avg: 4.3 },
                { year: 2020, player: 'Frank Gore', yards: 653, touchdowns: 2, attempts: 187, avg: 3.5 },
                { year: 2019, player: 'Le\'Veon Bell', yards: 789, touchdowns: 3, attempts: 245, avg: 3.2 },
                { year: 2018, player: 'Isaiah Crowell', yards: 685, touchdowns: 6, attempts: 143, avg: 4.8 },
                { year: 2017, player: 'Bilal Powell', yards: 772, touchdowns: 5, attempts: 178, avg: 4.3 },
                { year: 2016, player: 'Matt Forte', yards: 813, touchdowns: 7, attempts: 218, avg: 3.7 },
                { year: 2015, player: 'Chris Ivory', yards: 1070, touchdowns: 7, attempts: 247, avg: 4.3 },
                { year: 2014, player: 'Chris Ivory', yards: 821, touchdowns: 6, attempts: 198, avg: 4.1 },
                { year: 2013, player: 'Chris Ivory', yards: 833, touchdowns: 3, attempts: 182, avg: 4.6 }
              ],
              career: [
                { player: 'Curtis Martin', years: '1998-2005', games: 123, yards: 10302, touchdowns: 58, attempts: 2560, avg: 4.0 },
                { player: 'Freeman McNeil', years: '1981-1992', games: 144, yards: 8074, touchdowns: 38, attempts: 1798, avg: 4.5 },
                { player: 'Thomas Jones', years: '2007-2009', games: 48, yards: 3833, touchdowns: 28, attempts: 931, avg: 4.1 },
                { player: 'John Riggins', years: '1971-1975', games: 61, yards: 3880, touchdowns: 23, attempts: 1048, avg: 3.7 },
                { player: 'Adrian Murrell', years: '1993-1997', games: 67, yards: 3663, touchdowns: 18, attempts: 967, avg: 3.8 },
                { player: 'Emerson Boozer', years: '1966-1975', games: 129, yards: 3379, touchdowns: 31, attempts: 947, avg: 3.6 },
                { player: 'Matt Snell', years: '1964-1972', games: 112, yards: 3253, touchdowns: 18, attempts: 919, avg: 3.5 },
                { player: 'Shonn Greene', years: '2009-2012', games: 61, yards: 3110, touchdowns: 18, attempts: 802, avg: 3.9 },
                { player: 'LaDainian Tomlinson', years: '2010-2011', games: 29, yards: 1194, touchdowns: 7, attempts: 294, avg: 4.1 },
                { player: 'Bilal Powell', years: '2011-2019', games: 109, yards: 3675, touchdowns: 15, attempts: 850, avg: 4.3 }
              ]
            },
            receiving: {
              season: [
                { year: 2022, player: 'Garrett Wilson', yards: 1103, touchdowns: 4, receptions: 83, avg: 13.3 },
                { year: 2021, player: 'Elijah Moore', yards: 538, touchdowns: 5, receptions: 43, avg: 12.5 },
                { year: 2020, player: 'Jamison Crowder', yards: 699, touchdowns: 6, receptions: 59, avg: 11.8 },
                { year: 2019, player: 'Jamison Crowder', yards: 833, touchdowns: 6, receptions: 78, avg: 10.7 },
                { year: 2018, player: 'Robby Anderson', yards: 752, touchdowns: 6, receptions: 50, avg: 15.0 },
                { year: 2017, player: 'Robby Anderson', yards: 941, touchdowns: 7, receptions: 63, avg: 14.9 },
                { year: 2016, player: 'Brandon Marshall', yards: 788, touchdowns: 3, receptions: 59, avg: 13.4 },
                { year: 2015, player: 'Brandon Marshall', yards: 1502, touchdowns: 14, receptions: 109, avg: 13.8 },
                { year: 2014, player: 'Eric Decker', yards: 962, touchdowns: 5, receptions: 74, avg: 13.0 },
                { year: 2013, player: 'Jeremy Kerley', yards: 523, touchdowns: 3, receptions: 43, avg: 12.2 }
              ],
              career: [
                { player: 'Don Maynard', years: '1960-1972', games: 172, yards: 11733, touchdowns: 88, receptions: 627, avg: 18.7 },
                { player: 'Wayne Chrebet', years: '1995-2005', games: 152, yards: 7365, touchdowns: 41, receptions: 580, avg: 12.7 },
                { player: 'Wesley Walker', years: '1977-1989', games: 154, yards: 8306, touchdowns: 71, receptions: 438, avg: 19.0 },
                { player: 'George Sauer', years: '1965-1970', games: 84, yards: 4965, touchdowns: 28, receptions: 309, avg: 16.1 },
                { player: 'Laveranues Coles', years: '2000-2005, 2009', games: 105, yards: 5978, touchdowns: 37, receptions: 459, avg: 13.0 },
                { player: 'Rich Caster', years: '1970-1977', games: 107, yards: 4434, touchdowns: 36, receptions: 228, avg: 19.4 },
                { player: 'Jerricho Cotchery', years: '2004-2010', games: 110, yards: 4514, touchdowns: 18, receptions: 358, avg: 12.6 },
                { player: 'Mickey Shuler', years: '1978-1989', games: 166, yards: 4819, touchdowns: 37, receptions: 438, avg: 11.0 },
                { player: 'Al Toon', years: '1985-1992', games: 107, yards: 6605, touchdowns: 31, receptions: 517, avg: 12.8 },
                { player: 'Keyshawn Johnson', years: '1996-1999', games: 64, yards: 4108, touchdowns: 17, receptions: 305, avg: 13.5 }
              ]
            }
          };
          
          setStats(dummyStats);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching Jets stats:', error);
        setError('Failed to load Jets statistics. Please try again later.');
        setLoading(false);
      }
    };

    fetchStats();
  }, [selectedCategory, displayType]);

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

    if (!stats || !stats[selectedCategory] || !stats[selectedCategory][displayType]) {
      return (
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
          No statistics available for this selection.
        </div>
      );
    }

    const data = stats[selectedCategory][displayType];
    const keys = Object.keys(data[0]).filter(key => key !== 'player' && key !== 'year' && key !== 'years');

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="py-3 px-4 border-b text-left">{displayType === 'season' ? 'Year' : 'Player'}</th>
              {displayType === 'season' ? <th className="py-3 px-4 border-b text-left">Player</th> : <th className="py-3 px-4 border-b text-left">Years</th>}
              {displayType === 'career' && <th className="py-3 px-4 border-b text-left">Games</th>}
              {keys.map(key => (
                key !== 'games' && <th key={key} className="py-3 px-4 border-b text-left">{renderColumnHeader(key)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-3 px-4 border-b font-medium">
                  {displayType === 'season' ? row.year : row.player}
                </td>
                <td className="py-3 px-4 border-b">
                  {displayType === 'season' ? row.player : row.years}
                </td>
                {displayType === 'career' && <td className="py-3 px-4 border-b">{row.games}</td>}
                {keys.map(key => (
                  key !== 'games' && <td key={key} className="py-3 px-4 border-b">{row[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
        
        {/* Visualization Placeholder */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
          <p className="text-gray-500">Data visualization will be implemented here</p>
        </div>
      </div>
      
      {/* Stats Display */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          {displayType === 'season' ? 'Season Leaders' : 'Career Leaders'}: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </h3>
        {renderStats()}
      </div>
    </div>
  );
}

export default JetsStats;
