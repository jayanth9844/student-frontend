# 🛠️ Manual Virtual Environment Setup Guide

## 📋 Prerequisites Check

Before starting, ensure you have:
- Windows 10/11
- Administrator access
- Internet connection
- At least 2GB free disk space

## 🔧 Step 1: Install Node.js (Clean Installation)

### Download and Install Node.js 18 LTS
1. **Download Node.js**:
   - Go to: https://nodejs.org/en/download/
   - Download "Windows Installer (.msi)" for Node.js 18.x LTS
   - Choose 64-bit version

2. **Install Node.js**:
   - Run the downloaded `.msi` file as Administrator
   - Follow installation wizard
   - ✅ Check "Add to PATH" option
   - ✅ Check "Install additional tools" if prompted

3. **Verify Installation**:
   ```cmd
   # Open NEW Command Prompt (important - restart terminal)
   node --version
   npm --version
   ```
   Expected output:
   ```
   v18.18.0 (or similar)
   9.8.1 (or similar)
   ```

## 🗂️ Step 2: Create Isolated Project Directory

### Set up Clean Environment
```cmd
# Create a dedicated directory for the project
mkdir "C:\StudentDashboard"
cd "C:\StudentDashboard"

# Copy your project files here (alternative to working in OneDrive)
# This avoids OneDrive sync issues
```

### Copy Project Files
```cmd
# Copy all files from your current project
xcopy "C:\Users\Jayanth Raj G\OneDrive\Documents\student-frontend\*" "C:\StudentDashboard\" /E /H /Y

# Verify files copied
dir
```

## 🧹 Step 3: Clean Environment Setup

### Remove Previous Installations
```cmd
cd "C:\StudentDashboard"

# Remove any existing node_modules
if exist node_modules rmdir /s /q node_modules

# Remove package-lock.json
if exist package-lock.json del package-lock.json

# Remove build cache
if exist .next rmdir /s /q .next

# Clear npm cache globally
npm cache clean --force
```

## 📦 Step 4: Install Dependencies in Isolation

### Set NPM Configuration for Isolation
```cmd
# Set npm to use local cache
npm config set cache "C:\StudentDashboard\.npm-cache"

# Set npm registry (ensure clean downloads)
npm config set registry https://registry.npmjs.org/

# Verify npm configuration
npm config list
```

### Install Project Dependencies
```cmd
cd "C:\StudentDashboard"

# Install dependencies with verbose output
npm install --verbose

# Verify installation
npm list --depth=0
```

## 🔍 Step 5: Verify Environment

### Check Critical Dependencies
```cmd
# Verify Next.js installation
npx next --version

# Verify TypeScript
npx tsc --version

# Check if all dependencies are installed
npm ls
```

### Test Build Process
```cmd
# Test production build
npm run build

# If build succeeds, you'll see:
# ✓ Compiled successfully
```

## 🚀 Step 6: Start Development Server

### Launch the Application
```cmd
cd "C:\StudentDashboard"

# Start development server
npm run dev
```

### Expected Output
```
▲ Next.js 14.2.5
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.3s
```

## 🌐 Step 7: Access and Test

### Open in Browser
1. Open browser and go to: http://localhost:3000
2. You should see the Student Performance Dashboard
3. Test CSV upload with `sample_students.csv`

### Verify Features
- ✅ Dashboard loads correctly
- ✅ CSV upload works (test with sample_students.csv)
- ✅ Charts render properly
- ✅ Student table displays data
- ✅ Learning personas are classified
- ✅ No console errors

## 🔧 Troubleshooting Common Issues

### Issue 1: "npm not recognized"
**Solution:**
```cmd
# Add Node.js to PATH manually
set PATH=%PATH%;C:\Program Files\nodejs\

# Or restart Command Prompt after Node.js installation
```

### Issue 2: "Port 3000 already in use"
**Solution:**
```cmd
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID_NUMBER> /F

# Or use different port
npm run dev -- -p 3001
```

### Issue 3: "Permission denied" errors
**Solution:**
```cmd
# Run Command Prompt as Administrator
# Right-click Command Prompt -> "Run as administrator"

# Or change npm permissions
npm config set prefix "C:\StudentDashboard\.npm-global"
```

### Issue 4: "Module not found" errors
**Solution:**
```cmd
# Clear everything and reinstall
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
```

### Issue 5: OneDrive sync issues
**Solution:**
```cmd
# Work in local directory instead
mkdir "C:\StudentDashboard"
# Copy files there instead of working in OneDrive folder
```

## 📁 Step 8: Environment Isolation Verification

### Check Isolation
```cmd
# Verify you're using local Node.js
where node
where npm

# Check npm cache location
npm config get cache

# Verify project dependencies are local
npm list --depth=0
```

### Environment Variables
```cmd
# Set environment variables for this session
set NODE_ENV=development
set NEXT_PUBLIC_BACKEND_URL=https://student-backend-2919.onrender.com

# Verify
echo %NODE_ENV%
echo %NEXT_PUBLIC_BACKEND_URL%
```

## 🎯 Step 9: Create Startup Script

### Create `start-dashboard.bat`
```batch
@echo off
echo Starting Student Performance Dashboard...
echo.

cd /d "C:\StudentDashboard"

echo Setting environment variables...
set NODE_ENV=development
set NEXT_PUBLIC_BACKEND_URL=https://student-backend-2919.onrender.com

echo.
echo Environment ready!
echo Dashboard will open at: http://localhost:3000
echo Sample data: sample_students.csv (222 students)
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev
```

### Make it executable
```cmd
# Save the above content as start-dashboard.bat
# Then run it anytime with:
start-dashboard.bat
```

## ✅ Success Checklist

When everything is working correctly:

- [ ] Node.js 18+ installed and accessible
- [ ] Project files copied to isolated directory
- [ ] Dependencies installed successfully
- [ ] Build process completes without errors
- [ ] Development server starts on port 3000
- [ ] Dashboard loads in browser
- [ ] CSV upload accepts sample_students.csv
- [ ] 222 student records process correctly
- [ ] Learning personas display properly
- [ ] Charts and analytics render
- [ ] No console errors in browser

## 🎉 You're Ready!

Your Student Performance Dashboard is now running in a completely isolated environment:

- **📁 Location**: `C:\StudentDashboard`
- **🌐 URL**: http://localhost:3000
- **📊 Data**: 222 sample students included
- **🤖 Features**: AI-powered persona classification
- **🔗 Backend**: Integrated with FastAPI ML service

To start anytime: Run `start-dashboard.bat` or `npm run dev` in the project directory!
