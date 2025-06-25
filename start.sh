#!/bin/bash

echo "Starting TreeCraft..."
echo ""
echo "Make sure Node.js is installed first!"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "Starting development server..."
    echo "The app will open at http://localhost:5173"
    echo ""
    npm run dev
else
    echo "Failed to install dependencies. Please check your Node.js installation."
    exit 1
fi
