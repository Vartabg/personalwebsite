import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import only our custom CSS
import '../css/index.css';

import { Chart as ChartJS, LineElement, PointElement, BarElement, LinearScale, Title, CategoryScale, Tooltip, Legend, Filler } from 'chart.js';

// Register Chart.js components globally
ChartJS.register(
  LineElement, 
  PointElement, 
  BarElement, 
  LinearScale, 
  CategoryScale, 
  Title, 
  Tooltip, 
  Legend,
  Filler
);

// Mount React app
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
