# Student Dashboard Environment Setup Script
# PowerShell version for Windows

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 Student Dashboard Environment Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the project root directory." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Function to check if command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check Node.js installation
Write-Host "📋 Checking Node.js environment..." -ForegroundColor Blue

if (-not (Test-Command "node")) {
    Write-Host ""
    Write-Host "❌ Node.js not found!" -ForegroundColor Red
    Write-Host "📥 Please install Node.js 18 from:" -ForegroundColor Yellow
    Write-Host "https://nodejs.org/dist/v18.18.0/node-v18.18.0-x64.msi" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter after installation to continue"
    
    # Check again after user confirms installation
    if (-not (Test-Command "node")) {
        Write-Host "❌ Node.js still not found. Please install and restart PowerShell." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Display current versions
Write-Host ""
Write-Host "📊 Environment Information:" -ForegroundColor Green
$nodeVersion = node --version
$npmVersion = npm --version
Write-Host "Node.js: $nodeVersion" -ForegroundColor White
Write-Host "npm: $npmVersion" -ForegroundColor White
Write-Host ""

# Check Node.js version
$nodeVersionNumber = $nodeVersion -replace 'v', ''
$majorVersion = [int]($nodeVersionNumber.Split('.')[0])
if ($majorVersion -lt 16) {
    Write-Host "⚠️ Warning: Node.js version $nodeVersion detected." -ForegroundColor Yellow
    Write-Host "Recommended: Node.js 18 or higher for best compatibility." -ForegroundColor Yellow
    Write-Host ""
}

# Clean previous installations
Write-Host "🧹 Cleaning previous installations..." -ForegroundColor Blue

$itemsToRemove = @("node_modules", "package-lock.json", ".next", "dist")
foreach ($item in $itemsToRemove) {
    if (Test-Path $item) {
        Write-Host "Removing $item..." -ForegroundColor Gray
        Remove-Item -Recurse -Force $item -ErrorAction SilentlyContinue
    }
}

# Clear npm cache
Write-Host "🗑️ Clearing npm cache..." -ForegroundColor Blue
try {
    npm cache clean --force 2>$null
} catch {
    Write-Host "Cache clean completed with warnings (normal)" -ForegroundColor Gray
}

# Install dependencies
Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
Write-Host "This may take a few minutes..." -ForegroundColor Gray
Write-Host ""

$installProcess = Start-Process -FilePath "npm" -ArgumentList "install" -Wait -PassThru -NoNewWindow
if ($installProcess.ExitCode -ne 0) {
    Write-Host ""
    Write-Host "❌ Installation failed!" -ForegroundColor Red
    Write-Host "Please check the error messages above." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Verify installation
Write-Host ""
Write-Host "✅ Verifying installation..." -ForegroundColor Green

$verifyProcess = Start-Process -FilePath "npm" -ArgumentList "list", "--depth=0" -Wait -PassThru -NoNewWindow -RedirectStandardOutput "nul"
if ($verifyProcess.ExitCode -ne 0) {
    Write-Host "⚠️ Some dependencies may have issues. Continuing anyway..." -ForegroundColor Yellow
}

# Test build process
Write-Host ""
Write-Host "🏗️ Testing build process..." -ForegroundColor Blue

$buildProcess = Start-Process -FilePath "npm" -ArgumentList "run", "build" -Wait -PassThru -NoNewWindow
if ($buildProcess.ExitCode -ne 0) {
    Write-Host ""
    Write-Host "❌ Build failed! Please check for errors above." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Success message
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ Environment Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Your Student Performance Dashboard is ready!" -ForegroundColor Cyan
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
Write-Host "Press Ctrl+C to stop the server when done." -ForegroundColor Gray
Write-Host ""

# Start the development server
try {
    npm run dev
} catch {
    Write-Host ""
    Write-Host "❌ Failed to start development server." -ForegroundColor Red
    Write-Host "You can manually start it with: npm run dev" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
}
