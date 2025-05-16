#!/bin/sh
NODE_ENV=development
cp .env.development .env
echo "Starting development server..."
npm run dev
