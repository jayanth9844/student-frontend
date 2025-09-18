@echo off
echo.
echo ========================================
echo 🚀 Student Dashboard Environment Setup
echo ========================================
echo.

:: Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

:: Check if NVM is installed
echo 📋 Checking Node.js environment...
nvm version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ❌ NVM not found. Installing Node.js directly...
    echo.
    echo 📥 Please download and install Node.js 18 from:
    echo https://nodejs.org/dist/v18.18.0/node-v18.18.0-x64.msi
    echo.
    echo After installation, run this script again.
    pause
    exit /b 1
)

:: Use Node.js 18
echo 📦 Setting up Node.js 18...
nvm use 18.18.0 >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Node.js 18.18.0...
    nvm install 18.18.0
    nvm use 18.18.0
)

:: Display current versions
echo.
echo 📊 Environment Information:
node --version
npm --version
echo.

:: Clean previous installations
echo 🧹 Cleaning previous installations...
if exist node_modules (
    echo Removing node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    echo Removing package-lock.json...
    del package-lock.json
)
if exist .next (
    echo Removing .next build cache...
    rmdir /s /q .next
)

:: Clear npm cache
echo 🗑️ Clearing npm cache...
npm cache clean --force >nul 2>&1

:: Install dependencies
echo.
echo 📦 Installing dependencies...
echo This may take a few minutes...
npm install

:: Check if installation was successful
if %errorlevel% neq 0 (
    echo.
    echo ❌ Installation failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

:: Verify critical dependencies
echo.
echo ✅ Verifying installation...
npm list next react typescript >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ Some dependencies may be missing. Continuing anyway...
)

:: Test build process
echo.
echo 🏗️ Testing build process...
npm run build
if %errorlevel% neq 0 (
    echo.
    echo ❌ Build failed! Please check for errors.
    pause
    exit /b 1
)

:: Success message
echo.
echo ========================================
echo ✅ Environment Setup Complete!
echo ========================================
echo.
echo 📊 Your Student Performance Dashboard is ready!
echo.
echo 🎯 Features Available:
echo   • 222 sample student records
echo   • AI-powered learning persona classification
echo   • Interactive charts and analytics
echo   • ML-based assessment score prediction
echo.
echo 🌐 Backend API: https://student-backend-2919.onrender.com
echo 📁 Sample Data: sample_students.csv
echo.
echo 🚀 Starting development server...
echo 📱 Dashboard will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server when done.
echo.

:: Start the development server
npm run dev
