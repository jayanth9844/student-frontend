@echo off
echo 🔧 Fixing favicon issue and starting dashboard...

:: Stop any running processes
taskkill /f /im node.exe >nul 2>&1

:: Navigate to script directory
cd /d "%~dp0"

:: Remove problematic favicon
if exist "src\app\favicon.ico" (
    echo Removing corrupted favicon...
    del "src\app\favicon.ico" >nul 2>&1
)

:: Clean previous installation
echo Cleaning previous installation...
if exist node_modules rmdir /s /q node_modules >nul 2>&1
if exist package-lock.json del package-lock.json >nul 2>&1
if exist .next rmdir /s /q .next >nul 2>&1

:: Clear npm cache
echo Clearing npm cache...
npm cache clean --force

:: Install dependencies
echo Installing dependencies...
npm install

:: Fix audit issues
echo Fixing security vulnerabilities...
npm audit fix --force

:: Install SWC dependencies
echo Installing SWC dependencies...
npm install @next/swc-win32-x64-msvc --save-dev

:: Set environment variables
set NODE_ENV=development
set NEXT_PUBLIC_BACKEND_URL=https://student-backend-2919.onrender.com

echo.
echo ✅ Setup complete! Starting development server...
echo 📱 Dashboard will be available at: http://localhost:3000
echo.

:: Start development server
npm run dev
