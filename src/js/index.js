import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import our CSS files
import '../css/index.css';

// Mount React app
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
