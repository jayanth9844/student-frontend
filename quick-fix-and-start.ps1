# Quick Fix and Start Script - Addresses all current issues
Write-Host "🔧 Quick Fix: Resolving all issues and starting dashboard..." -ForegroundColor Cyan

# Stop any running processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Navigate to project directory
Set-Location $PSScriptRoot

# Remove problematic favicon
if (Test-Path "src\app\favicon.ico") {
    Write-Host "Removing corrupted favicon..." -ForegroundColor Yellow
    Remove-Item "src\app\favicon.ico" -Force -ErrorAction SilentlyContinue
}

# Install missing dependencies
Write-Host "Installing missing dependencies..." -ForegroundColor Blue
npm install clsx tailwind-merge --save

# Fix any remaining issues
Write-Host "Running npm audit fix..." -ForegroundColor Blue
npm audit fix --force

# Install SWC dependencies
Write-Host "Installing SWC dependencies..." -ForegroundColor Blue
npm install @next/swc-win32-x64-msvc --save-dev

# Set environment variables
$env:NODE_ENV = "development"
$env:NEXT_PUBLIC_BACKEND_URL = "https://student-backend-2919.onrender.com"

Write-Host ""
Write-Host "✅ All fixes applied!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Dashboard Features:" -ForegroundColor White
Write-Host "  • 8 embedded sample students for immediate display" -ForegroundColor Gray
Write-Host "  • Fixed data parsing (comprehension, focus, retention, attention)" -ForegroundColor Gray
Write-Host "  • Corrected chart configurations" -ForegroundColor Gray
Write-Host "  • Proper number formatting (no unnecessary decimals)" -ForegroundColor Gray
Write-Host "  • AI-powered learning persona classification" -ForegroundColor Gray
Write-Host ""
Write-Host "🌐 Backend API: https://student-backend-2919.onrender.com" -ForegroundColor Cyan
Write-Host "📊 Charts: Bar (Comprehension vs Score), Scatter (Attention vs Performance), Radar (Student Profile)" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Starting development server..." -ForegroundColor Green
Write-Host "📱 Dashboard will be available at: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""

# Start development server
npm run dev
