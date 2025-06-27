@echo off
:: Change to the script's directory
cd /d "%~dp0"

echo Installing Electron dependencies...
call npm install

echo.
echo Building the React app...
call npm run build

echo.
echo Starting TreeForge desktop app...
call npm run electron

pause
