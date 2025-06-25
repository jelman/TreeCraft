#!/bin/bash

echo "Installing Electron dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "Building the React app..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "Starting TreeCraft desktop app..."
        npm run electron
    else
        echo "Failed to build React app!"
        exit 1
    fi
else
    echo "Failed to install dependencies!"
    exit 1
fi
