@echo off
echo Building TreeForge desktop application...
echo.

:: Change to the script's directory
cd /d "%~dp0"

:: Clear electron-builder cache to avoid symbolic link issues
echo Clearing electron-builder cache...
rmdir /s /q "%LOCALAPPDATA%\electron-builder\Cache" 2>nul

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
