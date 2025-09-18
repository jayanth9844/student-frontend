@echo off
title Student Performance Dashboard

echo.
echo ========================================
echo 🚀 Student Performance Dashboard
echo ========================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found!
    echo.
    echo Please install Node.js 18 from:
    echo https://nodejs.org/en/download/
    echo.
    pause
    exit /b 1
)

:: Display Node.js version
echo 📊 Environment Information:
node --version
npm --version
echo.

:: Set environment variables
echo 🔧 Setting up environment...
set NODE_ENV=development
set NEXT_PUBLIC_BACKEND_URL=https://student-backend-2919.onrender.com

:: Navigate to project directory
cd /d "%~dp0"

:: Check if dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    echo This may take a few minutes...
    npm install
    
    if %errorlevel% neq 0 (
        echo.
        echo ❌ Failed to install dependencies!
        pause
        exit /b 1
    )
)

:: Check if build is needed
if not exist ".next" (
    echo 🏗️ Building project for first time...
    npm run build
    
    if %errorlevel% neq 0 (
        echo.
        echo ❌ Build failed!
        pause
        exit /b 1
    )
)

:: Success message
echo.
echo ✅ Environment Ready!
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
echo ⚠️  Press Ctrl+C to stop the server when done
echo.

:: Start the development server
npm run dev

:: If we get here, the server stopped
echo.
echo 🛑 Server stopped.
pause
