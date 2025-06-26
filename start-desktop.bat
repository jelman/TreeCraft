@echo off
echo Installing Electron dependencies...
call npm install

echo.
echo Building the React app...
call npm run build

echo.
echo Starting TreeForge desktop app...
call npm run electron

pause
