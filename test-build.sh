#!/bin/bash
# Pre-push test script
echo "🧪 Testing build before push..."

echo "📦 Installing dependencies..."
npm ci

echo "🔍 Running linter..."
npm run lint

echo "🏗️ Building project..."
npm run build

echo "✅ All tests passed! Safe to push."
