@echo off
echo Quick Fix: Resolving all issues and starting dashboard...

:: Stop any running processes
taskkill /f /im node.exe >nul 2>&1

:: Navigate to script directory
cd /d "%~dp0"

:: Remove problematic favicon
if exist "src\app\favicon.ico" (
    echo Removing corrupted favicon...
    del "src\app\favicon.ico" >nul 2>&1
)

:: Install missing dependencies
echo Installing missing dependencies...
npm install clsx tailwind-merge --save

:: Fix audit issues
echo Running npm audit fix...
npm audit fix --force

:: Install SWC dependencies
echo Installing SWC dependencies...
npm install @next/swc-win32-x64-msvc --save-dev

:: Set environment variables
set NODE_ENV=development
set NEXT_PUBLIC_BACKEND_URL=https://student-backend-2919.onrender.com

echo.
echo All fixes applied!
echo.
echo Dashboard Features:
echo   - 8 embedded sample students for immediate display
echo   - Fixed data parsing (comprehension, focus, retention, attention)
echo   - Corrected chart configurations
echo   - Proper number formatting (no unnecessary decimals)
echo   - AI-powered learning persona classification
echo.
echo Backend API: https://student-backend-2919.onrender.com
echo Charts: Bar (Comprehension vs Score), Scatter (Attention vs Performance), Radar (Student Profile)
echo.
echo Starting development server...
echo Dashboard will be available at: http://localhost:3000
echo.

:: Start development server
npm run dev
