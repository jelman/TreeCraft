#!/bin/bash

echo "Building TreeCraft desktop application..."
echo ""

echo "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install dependencies!"
    exit 1
fi

echo "Building React app..."
npm run build
if [ $? -ne 0 ]; then
    echo "Failed to build React app!"
    exit 1
fi

echo "Building Electron app..."
npm run build-electron
if [ $? -ne 0 ]; then
    echo "Failed to build Electron app!"
    exit 1
fi

echo ""
echo "✅ Desktop app built successfully!"
echo ""
echo "The installer will be in the 'dist-electron' folder:"
echo "  - .AppImage file for Linux"
echo "  - Can be distributed to other Linux computers"
echo ""
echo "To install: chmod +x *.AppImage && ./YourApp.AppImage"
echo ""
