# 🚀 Setting Up Virtual Environment for Student Dashboard

## Option 1: Using Node Version Manager (NVM) - Recommended

### Step 1: Install NVM for Windows
1. **Download NVM for Windows**:
   - Go to: https://github.com/coreybutler/nvm-windows/releases
   - Download `nvm-setup.exe`
   - Run the installer as Administrator

2. **Verify Installation**:
   ```cmd
   nvm version
   ```

### Step 2: Create Node.js Virtual Environment
```cmd
# Install Node.js 18 (LTS)
nvm install 18.18.0

# Use Node.js 18 for this project
nvm use 18.18.0

# Verify Node version
node --version
npm --version
```

### Step 3: Set up Project Environment
```cmd
# Navigate to project directory
cd "C:\Users\Jayanth Raj G\OneDrive\Documents\student-frontend"

# Create a new terminal session with isolated environment
# Install dependencies in isolated environment
npm install

# Start development server
npm run dev
```

## Option 2: Using Docker (Complete Isolation)

### Step 1: Create Dockerfile
```dockerfile
# Use Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]
```

### Step 2: Create docker-compose.yml
```yaml
version: '3.8'
services:
  student-dashboard:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NEXT_PUBLIC_BACKEND_URL=https://student-backend-2919.onrender.com
```

### Step 3: Run with Docker
```cmd
# Build and run
docker-compose up --build

# Or run directly
docker build -t student-dashboard .
docker run -p 3000:3000 student-dashboard
```

## Option 3: Using Windows Sandbox (Ultimate Isolation)

### Step 1: Enable Windows Sandbox
1. Open "Turn Windows features on or off"
2. Enable "Windows Sandbox"
3. Restart computer

### Step 2: Setup Script for Sandbox
Create `sandbox-setup.ps1`:
```powershell
# Download and install Node.js
Invoke-WebRequest -Uri "https://nodejs.org/dist/v18.18.0/node-v18.18.0-x64.msi" -OutFile "nodejs.msi"
Start-Process msiexec.exe -Wait -ArgumentList '/I nodejs.msi /quiet'

# Clone or copy project files
# (You'll need to copy your project folder into the sandbox)

# Navigate and setup
Set-Location "C:\Users\WDAGUtilityAccount\Desktop\student-frontend"
npm install
npm run dev
```

## Option 4: Using pnpm with Isolated Store

### Step 1: Install pnpm
```cmd
# Install pnpm globally
npm install -g pnpm

# Verify installation
pnpm --version
```

### Step 2: Create Isolated Environment
```cmd
# Navigate to project
cd "C:\Users\Jayanth Raj G\OneDrive\Documents\student-frontend"

# Create isolated pnpm store
mkdir .pnpm-store
set PNPM_HOME=%cd%\.pnpm-store

# Install dependencies in isolation
pnpm install --store-dir .pnpm-store

# Run development server
pnpm dev
```

## 🎯 Recommended Approach: NVM + Clean Directory

### Complete Setup Script
Create `setup-clean-env.bat`:
```batch
@echo off
echo 🚀 Setting up Student Dashboard Environment...

:: Check if NVM is installed
nvm version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ NVM not found. Please install NVM for Windows first.
    echo Download from: https://github.com/coreybutler/nvm-windows/releases
    pause
    exit /b 1
)

:: Use Node.js 18
echo 📦 Setting up Node.js 18...
nvm use 18.18.0
if %errorlevel% neq 0 (
    echo Installing Node.js 18...
    nvm install 18.18.0
    nvm use 18.18.0
)

:: Navigate to project directory
cd /d "C:\Users\Jayanth Raj G\OneDrive\Documents\student-frontend"

:: Clean install
echo 🧹 Cleaning previous installations...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .next rmdir /s /q .next

:: Install dependencies
echo 📦 Installing dependencies...
npm install

:: Verify installation
echo ✅ Verifying installation...
npm list --depth=0

:: Start development server
echo 🚀 Starting development server...
echo.
echo 📊 Dashboard will be available at: http://localhost:3000
echo 📁 Sample data: sample_students.csv (222 students)
echo 🤖 Backend API: https://student-backend-2919.onrender.com
echo.
npm run dev

pause
```

### Quick Start Commands
```cmd
# Make the script executable and run
cd "C:\Users\Jayanth Raj G\OneDrive\Documents\student-frontend"
setup-clean-env.bat
```

## 🔧 Environment Verification

### Check Environment Health
```cmd
# Verify Node.js version
node --version

# Verify npm version  
npm --version

# Check project dependencies
npm list --depth=0

# Test build process
npm run build

# Start development server
npm run dev
```

### Expected Output
```
✅ Node.js: v18.18.0
✅ npm: 9.8.1
✅ Next.js: 14.2.5
✅ TypeScript: 5.5.4
✅ Build: Successful
✅ Server: http://localhost:3000
```

## 🎉 Success Indicators

When everything is working correctly, you should see:
- ✅ Development server starts on port 3000
- ✅ Dashboard loads with upload interface
- ✅ Sample CSV (222 students) uploads successfully
- ✅ Charts and visualizations render
- ✅ Learning personas are classified
- ✅ No console errors

## 🆘 Troubleshooting

### Common Issues
1. **Node.js Version Conflicts**
   ```cmd
   nvm list
   nvm use 18.18.0
   ```

2. **Port Already in Use**
   ```cmd
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

3. **Permission Issues**
   - Run Command Prompt as Administrator
   - Check antivirus software blocking npm

4. **Dependency Issues**
   ```cmd
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```
