#!/bin/sh

# Build the frontend
echo "Building frontend..."
npm run build

# Start the server
echo "Starting server on http://localhost:3000"
npm start
