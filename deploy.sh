#!/bin/sh

# Build the production version
echo "Building production version..."
npm run build

# Zip the deployable files
echo "Creating deployment package..."
zip -r deployment.zip server.js public/ package.json package-lock.json .env

echo "Deployment package 'deployment.zip' created successfully!"
echo "Upload this package to your hosting provider."
