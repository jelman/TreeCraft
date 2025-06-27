@echo off
:: Change to the script's directory
cd /d "%~dp0"

echo Starting TreeForge...
echo.
echo Make sure Node.js is installed first!
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting development server...
echo The app will open at http://localhost:5173
echo.
call npm run dev
pause
