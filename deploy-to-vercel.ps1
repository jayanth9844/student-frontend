# Student Performance Dashboard - Vercel Deployment Script
Write-Host "🚀 Student Performance Dashboard - Vercel Deployment" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the project root directory." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check Node.js version
Write-Host "📋 Checking environment..." -ForegroundColor Blue
$nodeVersion = node --version
$npmVersion = npm --version
Write-Host "Node.js: $nodeVersion" -ForegroundColor White
Write-Host "npm: $npmVersion" -ForegroundColor White
Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Run build test
Write-Host "🏗️ Testing production build..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors before deploying." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "🔍 Checking Vercel CLI..." -ForegroundColor Blue
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "📥 Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Vercel CLI!" -ForegroundColor Red
        Write-Host "Please install manually: npm install -g vercel" -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host "✅ Vercel CLI ready!" -ForegroundColor Green
Write-Host ""

# Display deployment information
Write-Host "📊 Deployment Information:" -ForegroundColor Cyan
Write-Host "  • Project: Student Performance Dashboard" -ForegroundColor White
Write-Host "  • Framework: Next.js 14.2.5" -ForegroundColor White
Write-Host "  • Backend: https://student-backend-2919.onrender.com" -ForegroundColor White
Write-Host "  • Features: AI-powered student analytics" -ForegroundColor White
Write-Host ""

# Confirm deployment
Write-Host "🚀 Ready to deploy to Vercel!" -ForegroundColor Green
Write-Host ""
$confirm = Read-Host "Deploy to production? (y/N)"

if ($confirm -eq 'y' -or $confirm -eq 'Y') {
    Write-Host ""
    Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Green
    Write-Host ""
    
    # Deploy to Vercel
    vercel --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "🎉 Deployment successful!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📊 Your Student Performance Dashboard is now live!" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Features available:" -ForegroundColor White
        Write-Host "  ✅ CSV upload with 222+ student support" -ForegroundColor Gray
        Write-Host "  ✅ AI-powered learning persona classification" -ForegroundColor Gray
        Write-Host "  ✅ Interactive charts and analytics" -ForegroundColor Gray
        Write-Host "  ✅ FastAPI ML backend integration" -ForegroundColor Gray
        Write-Host "  ✅ Responsive design for all devices" -ForegroundColor Gray
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "❌ Deployment failed!" -ForegroundColor Red
        Write-Host "Please check the error messages above." -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "⏸️ Deployment cancelled." -ForegroundColor Yellow
    Write-Host "You can deploy later using: vercel --prod" -ForegroundColor Gray
}

Write-Host ""
Read-Host "Press Enter to exit"
