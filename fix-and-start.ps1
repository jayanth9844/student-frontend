# Fix favicon issue and start dashboard
Write-Host "🔧 Fixing favicon issue and starting dashboard..." -ForegroundColor Cyan

# Stop any running Next.js processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Navigate to project directory
Set-Location $PSScriptRoot

# Remove problematic favicon from app directory
if (Test-Path "src\app\favicon.ico") {
    Write-Host "Removing corrupted favicon..." -ForegroundColor Yellow
    Remove-Item "src\app\favicon.ico" -Force -ErrorAction SilentlyContinue
}

# Clean and reinstall dependencies (PowerShell syntax)
Write-Host "Cleaning previous installation..." -ForegroundColor Blue

# Remove node_modules (PowerShell way)
if (Test-Path "node_modules") {
    Remove-Item "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
}

# Remove package-lock.json
if (Test-Path "package-lock.json") {
    Remove-Item "package-lock.json" -Force -ErrorAction SilentlyContinue
}

# Remove .next build cache
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue
}

# Clear npm cache
Write-Host "Clearing npm cache..." -ForegroundColor Blue
npm cache clean --force

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Blue
npm install

# Fix any audit issues
Write-Host "Fixing security vulnerabilities..." -ForegroundColor Blue
npm audit fix --force

# Install missing SWC dependencies
Write-Host "Installing SWC dependencies..." -ForegroundColor Blue
npm install @next/swc-win32-x64-msvc --save-dev

# Set environment variables
$env:NODE_ENV = "development"
$env:NEXT_PUBLIC_BACKEND_URL = "https://student-backend-2919.onrender.com"

Write-Host ""
Write-Host "✅ Setup complete! Starting development server..." -ForegroundColor Green
Write-Host "📱 Dashboard will be available at: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""

# Start development server
npm run dev
