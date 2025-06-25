@echo off
echo Starting TreeCraft...
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
