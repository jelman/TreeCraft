@echo off
echo Building TreeForge desktop application...
echo.

call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies!
    pause
    exit /b 1
)

call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Failed to build React app!
    pause
    exit /b 1
)

call npm run build-electron
if %ERRORLEVEL% NEQ 0 (
    echo Failed to build Electron app!
    pause
    exit /b 1
)

echo.
echo ✅ Desktop app built successfully!
echo.
echo The installer will be in the 'dist-electron' folder.
echo You can distribute this file to install the app on other computers.
echo.
pause
