@echo off
echo Building TreeCraft for deployment...
echo.

call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies!
    pause
    exit /b 1
)

call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.
echo The app is ready for deployment in the 'dist' folder.
echo You can:
echo   1. Upload the 'dist' folder to any web hosting service
echo   2. Run 'npm run serve' to preview the built version
echo   3. Deploy to GitHub Pages, Netlify, or Vercel
echo.
pause
