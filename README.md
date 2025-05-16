# Personal Multi-App Platform

A comprehensive web platform featuring three main components:

1. **Tariff Explorer** - Visualize and explore historical US tariff data
2. **Pet Finder** - Search for adoptable pets in your area
3. **Jets Stats** - View historical statistics for the New York Jets

## Features

- Modern, responsive design using Tailwind CSS
- Interactive data visualizations
- Mobile-first approach
- React frontend with Express backend
- API integrations for real-time data

## Tech Stack
- **Frontend**: React, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express
- **Build Tools**: Webpack, Babel
- **API Integrations**: Petfinder API, Sports Data API

## Installation

1. Clone the repository:
git clone <repository-url>
2. Install dependencies:
npm install
3. Create a `.env` file in the root directory with the following variables:
PORT=3000
PETFINDER_API_KEY=your_petfinder_api_key
PETFINDER_API_SECRET=your_petfinder_api_secret
SPORTS_API_KEY=your_sports_api_key
4. Build the frontend:
npm run build

5. Start the server:
npm start
## Development

To run the project in development mode with hot reloading:
npm run dev

To watch for frontend changes during development:
npm run watch

## Project Structure
/pweb
├── public/           # Static files and build output
├── src/              # Source code
│   ├── components/   # React components
│   │   ├── tariffExplorer/
│   │   ├── petFinder/
│   │   └── jetsStats/
│   ├── css/          # CSS styles
│   ├── js/           # JavaScript files
│   └── data/         # Data files
├── server.js         # Express server
├── webpack.config.js # Webpack configuration
└── package.json      # Project dependencies
## API Endpoints

- `/api/tariff-data` - Get historical tariff data
- `/api/pets` - Search for adoptable pets by ZIP code
- `/api/jets-stats` - Get Jets statistics by category and type

## License

ISC
