#!/bin/sh
NODE_ENV=production
cp .env.production .env
echo "Building production version..."
npm run build
echo "Production build completed! Files are in the 'public' directory."
