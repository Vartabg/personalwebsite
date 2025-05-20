#!/bin/sh

# Simple test script to verify components are working

echo "Testing Tariff Explorer Component..."
if grep -q "tariffData" src/components/tariffExplorer/TariffExplorer.js; then
  echo "✓ Tariff Explorer component is configured correctly"
else
  echo "✗ Tariff Explorer component may have issues"
fi

echo "Testing Pet Finder Component..."
if grep -q "PetFinder" src/js/App.js; then
  echo "✓ Pet Finder component is integrated in the app"
else
  echo "✗ Pet Finder component may not be properly integrated"
fi

echo "Testing Jets Stats Component..."
if grep -q "JetsStats" src/js/App.js; then
  echo "✓ Jets Stats component is integrated in the app"
else
  echo "✗ Jets Stats component may not be properly integrated"
fi

echo "Testing API Endpoints..."
# Check if server.js contains the API endpoints
if grep -q "/api/tariff-data" server.js && grep -q "/api/pets" server.js && grep -q "/api/jets-stats" server.js; then
  echo "✓ API endpoints are properly defined in server.js"
else
  echo "✗ Some API endpoints may be missing in server.js"
fi

echo "Testing tariff data file..."
if [ -f "src/data/tariffData.json" ]; then
  echo "✓ Tariff data file exists"
  
  # Check if the file contains the expected sections
  if grep -q "rates" src/data/tariffData.json && grep -q "keyLegislation" src/data/tariffData.json && grep -q "economicImpacts" src/data/tariffData.json; then
    echo "✓ Tariff data file contains all required sections"
  else
    echo "✗ Tariff data file may be missing some sections"
  fi
else
  echo "✗ Tariff data file does not exist"
fi

echo "Testing application build..."
npm run build
if [ $? -eq 0 ]; then
  echo "✓ Application builds successfully"
else
  echo "✗ Application build failed"
fi

echo "All tests completed."
