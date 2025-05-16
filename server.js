const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
// Tariff data route
app.get('/api/tariff-data', (req, res) => {
  // Placeholder - will implement actual data fetching later
  res.json({ message: 'Tariff data endpoint' });
});

// Pet finder route
app.get('/api/pets', (req, res) => {
  // Placeholder - will implement pet API integration later
  res.json({ message: 'Pet finder endpoint' });
});

// Jets stats route
app.get('/api/jets-stats', (req, res) => {
  // Placeholder - will implement sports API integration later
  res.json({ message: 'Jets stats endpoint' });
});

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
