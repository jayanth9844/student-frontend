# Student Performance Dashboard Startup Script
# PowerShell version with enhanced error handling

$Host.UI.RawUI.WindowTitle = "Student Performance Dashboard"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 Student Performance Dashboard" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check Node.js installation
if (-not (Test-Command "node")) {
    Write-Host "❌ Node.js not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js 18 from:" -ForegroundColor Yellow
    Write-Host "https://nodejs.org/en/download/" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Display environment information
Write-Host "📊 Environment Information:" -ForegroundColor Green
$nodeVersion = node --version
$npmVersion = npm --version
Write-Host "Node.js: $nodeVersion" -ForegroundColor White
Write-Host "npm: $npmVersion" -ForegroundColor White
Write-Host ""

# Set environment variables
Write-Host "🔧 Setting up environment..." -ForegroundColor Blue
$env:NODE_ENV = "development"
$env:NEXT_PUBLIC_BACKEND_URL = "https://student-backend-2919.onrender.com"

# Navigate to script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Check if dependencies are installed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
    Write-Host "This may take a few minutes..." -ForegroundColor Gray
    Write-Host ""
    
    $installProcess = Start-Process -FilePath "npm" -ArgumentList "install" -Wait -PassThru -NoNewWindow
    if ($installProcess.ExitCode -ne 0) {
        Write-Host ""
        Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Check if build exists
if (-not (Test-Path ".next")) {
    Write-Host "🏗️ Building project for first time..." -ForegroundColor Blue
    
    $buildProcess = Start-Process -FilePath "npm" -ArgumentList "run", "build" -Wait -PassThru -NoNewWindow
    if ($buildProcess.ExitCode -ne 0) {
        Write-Host ""
        Write-Host "❌ Build failed!" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Success message
Write-Host ""
Write-Host "✅ Environment Ready!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Features Available:" -ForegroundColor White
Write-Host "  • 222 sample student records" -ForegroundColor Gray
Write-Host "  • AI-powered learning persona classification" -ForegroundColor Gray
Write-Host "  • Interactive charts and analytics" -ForegroundColor Gray
Write-Host "  • ML-based assessment score prediction" -ForegroundColor Gray
Write-Host ""
Write-Host "🌐 Backend API: https://student-backend-2919.onrender.com" -ForegroundColor Cyan
Write-Host "📁 Sample Data: sample_students.csv" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Starting development server..." -ForegroundColor Green
Write-Host "📱 Dashboard will open at: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  Press Ctrl+C to stop the server when done" -ForegroundColor Yellow
Write-Host ""

# Start the development server
try {
    & npm run dev
} catch {
    Write-Host ""
    Write-Host "❌ Failed to start development server." -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
} finally {
    Write-Host ""
    Write-Host "🛑 Server stopped." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
}
