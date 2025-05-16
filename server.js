const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Pet Finder API proxy
app.get('/api/pets', async (req, res) => {
  try {
    const { zipCode } = req.query;
    
    // Validate input
    if (!zipCode || !/^\d{5}$/.test(zipCode)) {
      return res.status(400).json({ error: 'Invalid ZIP code' });
    }
    
    // In a real implementation, you would use the Petfinder API
    // const petfinderRes = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
    //   grant_type: 'client_credentials',
    //   client_id: process.env.PETFINDER_API_KEY,
    //   client_secret: process.env.PETFINDER_API_SECRET
    // });
    // 
    // const token = petfinderRes.data.access_token;
    // 
    // const petsRes = await axios.get(`https://api.petfinder.com/v2/animals`, {
    //   headers: { Authorization: `Bearer ${token}` },
    //   params: { location: zipCode, type: 'cat', sort: 'distance' }
    // });
    // 
    // res.json(petsRes.data);
    
    // For now, return placeholder data
    const mockPets = [
      {
        id: 1,
        name: 'Whiskers',
        type: 'Cat',
        breed: 'Domestic Shorthair',
        age: '2 years',
        gender: 'Male',
        size: 'Medium',
        description: 'Whiskers is a playful and affectionate cat who loves attention.',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
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
        image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
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
        image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      }
    ];
    
    // Simulate some network latency
    setTimeout(() => {
      res.json({ animals: mockPets });
    }, 500);
  } catch (error) {
    console.error('Pet API Error:', error);
    res.status(500).json({ error: 'Failed to fetch pets data' });
  }
});

// Jets Stats API
app.get('/api/jets-stats', async (req, res) => {
  try {
    const { category = 'passing', type = 'season' } = req.query;
    
    // In a real implementation, you would use a sports API
    // const sportsRes = await axios.get(`https://api.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStatsByTeam/NYJ`, {
    //   headers: { 'Ocp-Apim-Subscription-Key': process.env.SPORTS_API_KEY }
    // });
    // 
    // res.json(sportsRes.data);
    
    // For now, return placeholder data
    const mockStats = {
      passing: {
        season: [
          { year: 2022, player: 'Zach Wilson', yards: 1688, touchdowns: 6, interceptions: 7, rating: 72.8 },
          { year: 2021, player: 'Zach Wilson', yards: 2334, touchdowns: 9, interceptions: 11, rating: 69.7 },
          { year: 2020, player: 'Sam Darnold', yards: 2208, touchdowns: 9, interceptions: 11, rating: 72.7 },
          { year: 2019, player: 'Sam Darnold', yards: 3024, touchdowns: 19, interceptions: 13, rating: 84.3 },
          { year: 2018, player: 'Sam Darnold', yards: 2865, touchdowns: 17, interceptions: 15, rating: 77.6 }
        ],
        career: [
          { player: 'Joe Namath', years: '1965-1976', games: 140, yards: 27057, touchdowns: 170, interceptions: 215, rating: 65.5 },
          { player: 'Ken O\'Brien', years: '1983-1992', games: 124, yards: 24386, touchdowns: 124, interceptions: 101, rating: 80.4 },
          { player: 'Vinny Testaverde', years: '1998-2005', games: 99, yards: 21022, touchdowns: 118, interceptions: 105, rating: 78.8 },
          { player: 'Richard Todd', years: '1976-1984', games: 119, yards: 18989, touchdowns: 110, interceptions: 138, rating: 67.6 },
          { player: 'Chad Pennington', years: '2000-2007', games: 69, yards: 13738, touchdowns: 82, interceptions: 55, rating: 88.9 }
        ]
      },
      rushing: {
        season: [
          { year: 2022, player: 'Breece Hall', yards: 463, touchdowns: 4, attempts: 80, avg: 5.8 },
          { year: 2021, player: 'Michael Carter', yards: 639, touchdowns: 4, attempts: 147, avg: 4.3 },
          { year: 2020, player: 'Frank Gore', yards: 653, touchdowns: 2, attempts: 187, avg: 3.5 },
          { year: 2019, player: 'Le\'Veon Bell', yards: 789, touchdowns: 3, attempts: 245, avg: 3.2 },
          { year: 2018, player: 'Isaiah Crowell', yards: 685, touchdowns: 6, attempts: 143, avg: 4.8 }
        ],
        career: [
          { player: 'Curtis Martin', years: '1998-2005', games: 123, yards: 10302, touchdowns: 58, attempts: 2560, avg: 4.0 },
          { player: 'Freeman McNeil', years: '1981-1992', games: 144, yards: 8074, touchdowns: 38, attempts: 1798, avg: 4.5 },
          { player: 'Thomas Jones', years: '2007-2009', games: 48, yards: 3833, touchdowns: 28, attempts: 931, avg: 4.1 },
          { player: 'John Riggins', years: '1971-1975', games: 61, yards: 3880, touchdowns: 23, attempts: 1048, avg: 3.7 },
          { player: 'Adrian Murrell', years: '1993-1997', games: 67, yards: 3663, touchdowns: 18, attempts: 967, avg: 3.8 }
        ]
      },
      receiving: {
        season: [
          { year: 2022, player: 'Garrett Wilson', yards: 1103, touchdowns: 4, receptions: 83, avg: 13.3 },
          { year: 2021, player: 'Elijah Moore', yards: 538, touchdowns: 5, receptions: 43, avg: 12.5 },
          { year: 2020, player: 'Jamison Crowder', yards: 699, touchdowns: 6, receptions: 59, avg: 11.8 },
          { year: 2019, player: 'Jamison Crowder', yards: 833, touchdowns: 6, receptions: 78, avg: 10.7 },
          { year: 2018, player: 'Robby Anderson', yards: 752, touchdowns: 6, receptions: 50, avg: 15.0 }
        ],
        career: [
          { player: 'Don Maynard', years: '1960-1972', games: 172, yards: 11733, touchdowns: 88, receptions: 627, avg: 18.7 },
          { player: 'Wayne Chrebet', years: '1995-2005', games: 152, yards: 7365, touchdowns: 41, receptions: 580, avg: 12.7 },
          { player: 'Wesley Walker', years: '1977-1989', games: 154, yards: 8306, touchdowns: 71, receptions: 438, avg: 19.0 },
          { player: 'George Sauer', years: '1965-1970', games: 84, yards: 4965, touchdowns: 28, receptions: 309, avg: 16.1 },
          { player: 'Laveranues Coles', years: '2000-2005, 2009', games: 105, yards: 5978, touchdowns: 37, receptions: 459, avg: 13.0 }
        ]
      }
    };
    
    if (!mockStats[category] || !mockStats[category][type]) {
      return res.status(404).json({ error: 'Data not found for the selected category and type' });
    }
    
    res.json(mockStats[category][type]);
  } catch (error) {
    console.error('Jets Stats API Error:', error);
    res.status(500).json({ error: 'Failed to fetch Jets statistics' });
  }
});

// Tariff data API
app.get('/api/tariff-data', (req, res) => {
  try {
    const mockTariffData = {
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
      ],
      keyLegislation: [
        { year: 1789, name: 'Tariff Act of 1789', description: 'First major tariff law in American history.' },
        { year: 1828, name: 'Tariff of Abominations', description: 'Highly protective tariff that favored Northern manufacturing interests.' },
        { year: 1832, name: 'Tariff of 1832', description: 'Reduced duties from the 1828 tariff but maintained protectionism.' },
        { year: 1857, name: 'Tariff of 1857', description: 'Lowered tariff rates to pre-1846 levels.' },
        { year: 1861, name: 'Morrill Tariff', description: 'Raised rates to protect Northern industries during the Civil War.' },
        { year: 1890, name: 'McKinley Tariff', description: 'Raised average duties to nearly 50%, highest peacetime levels.' },
        { year: 1922, name: 'Fordney-McCumber Tariff', description: 'Raised tariffs after World War I to protect domestic industries.' },
        { year: 1930, name: 'Smoot-Hawley Tariff', description: 'Raised tariffs during the Great Depression, contributed to trade wars.' },
        { year: 1934, name: 'Reciprocal Trade Agreements Act', description: 'Authorized president to negotiate tariff reductions.' },
        { year: 1947, name: 'GATT Formation', description: 'Created the General Agreement on Tariffs and Trade, reducing global tariffs.' },
        { year: 1994, name: 'NAFTA Implementation', description: 'Eliminated most tariffs between the U.S., Canada, and Mexico.' },
        { year: 2018, name: 'Section 232 Tariffs', description: 'Imposed tariffs on steel and aluminum imports citing national security.' }
      ]
    };
    
    res.json(mockTariffData);
  } catch (error) {
    console.error('Tariff Data API Error:', error);
    res.status(500).json({ error: 'Failed to fetch tariff data' });
  }
});

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
