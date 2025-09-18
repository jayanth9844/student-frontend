# 📋 Manual Installation Guide - Step by Step

## 🎯 Quick Start (3 Steps)

### Step 1: Install Node.js
```cmd
# Download and install Node.js 18 from:
# https://nodejs.org/en/download/
# Choose "Windows Installer (.msi)" - 64-bit
```

### Step 2: Open Command Prompt and Navigate
```cmd
# Open Command Prompt (Win + R, type "cmd", press Enter)
cd "C:\Users\Jayanth Raj G\OneDrive\Documents\student-frontend"
```

### Step 3: Run Startup Script
```cmd
# Option A: Batch script (simple)
start-dashboard.bat

# Option B: PowerShell script (recommended)
powershell -ExecutionPolicy Bypass -File start-dashboard.ps1
```

**That's it!** Your dashboard will be running at http://localhost:3000

---

## 🔧 Detailed Manual Setup (If Scripts Don't Work)

### Prerequisites Installation

#### 1. Install Node.js 18 LTS
1. **Download**: Go to https://nodejs.org/en/download/
2. **Select**: "Windows Installer (.msi)" for 64-bit
3. **Install**: Run as Administrator, accept all defaults
4. **Verify**: Open NEW Command Prompt and run:
   ```cmd
   node --version
   npm --version
   ```

### Project Setup

#### 2. Navigate to Project Directory
```cmd
# Open Command Prompt
cd "C:\Users\Jayanth Raj G\OneDrive\Documents\student-frontend"

# Verify you're in the right place
dir package.json
```

#### 3. Clean Previous Installations (if any)
```cmd
# Remove old installations
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .next rmdir /s /q .next

# Clear npm cache
npm cache clean --force
```

#### 4. Install Dependencies
```cmd
# Install all project dependencies
npm install

# This will take 2-5 minutes depending on internet speed
# You should see progress messages
```

#### 5. Set Environment Variables
```cmd
# Set required environment variables
set NODE_ENV=development
set NEXT_PUBLIC_BACKEND_URL=https://student-backend-2919.onrender.com
```

#### 6. Test Build (Optional but Recommended)
```cmd
# Test that everything builds correctly
npm run build

# Should complete without errors
```

#### 7. Start Development Server
```cmd
# Start the dashboard
npm run dev

# Wait for message: "Ready in X.Xs"
# Then open browser to: http://localhost:3000
```

### Verification Steps

#### 8. Test the Dashboard
1. **Open Browser**: Go to http://localhost:3000
2. **Upload Test**: Click "Upload CSV" and select `sample_students.csv`
3. **Verify Data**: Should show 222 student records
4. **Check Charts**: Interactive charts should render
5. **Test Personas**: Learning personas should be classified

---

## 🚨 Troubleshooting Guide

### Problem: "node is not recognized"
**Solution:**
```cmd
# Node.js not in PATH. Add manually:
set PATH=%PATH%;C:\Program Files\nodejs\

# Or restart Command Prompt after Node.js installation
```

### Problem: "npm install fails"
**Solution:**
```cmd
# Try with different registry
npm config set registry https://registry.npmjs.org/
npm install

# Or clear cache and retry
npm cache clean --force
npm install
```

### Problem: "Port 3000 already in use"
**Solution:**
```cmd
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace XXXX with actual PID)
taskkill /PID XXXX /F

# Or use different port
npm run dev -- -p 3001
```

### Problem: "Permission denied"
**Solution:**
```cmd
# Run Command Prompt as Administrator
# Right-click Command Prompt -> "Run as administrator"

# Then repeat the installation steps
```

### Problem: OneDrive sync issues
**Solution:**
```cmd
# Copy project to local directory
mkdir C:\StudentDashboard
xcopy "C:\Users\Jayanth Raj G\OneDrive\Documents\student-frontend\*" "C:\StudentDashboard\" /E /H /Y
cd C:\StudentDashboard
npm install
npm run dev
```

---

## 🎯 Alternative: Isolated Directory Setup

If you want complete isolation from OneDrive:

### Create Isolated Environment
```cmd
# Create dedicated directory
mkdir "C:\StudentDashboard"
cd "C:\StudentDashboard"

# Copy all project files
xcopy "C:\Users\Jayanth Raj G\OneDrive\Documents\student-frontend\*" . /E /H /Y

# Install in isolated location
npm install

# Start server
npm run dev
```

### Benefits of Isolated Setup
- ✅ No OneDrive sync conflicts
- ✅ Faster file operations
- ✅ Complete environment isolation
- ✅ No interference with other projects

---

## ✅ Success Indicators

When everything is working correctly:

### Terminal Output
```
▲ Next.js 14.2.5
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.3s
```

### Browser Verification
- ✅ Dashboard loads at http://localhost:3000
- ✅ "Student Performance Dashboard" title visible
- ✅ CSV upload area present
- ✅ Sample data (sample_students.csv) uploads successfully
- ✅ Shows "222 students" after upload
- ✅ Charts render without errors
- ✅ Student table displays data
- ✅ Learning personas appear (High Achiever, Steady Learner, etc.)

### Console Check
- ✅ No red error messages in browser console (F12)
- ✅ API calls succeed (may show warnings, that's normal)

---

## 🎉 You're Ready!

Once you see the success indicators above, your Student Performance Dashboard is fully operational with:

- **🤖 AI-Powered Analytics**: ML-based student classification
- **📊 Interactive Charts**: Real-time data visualizations  
- **📁 Sample Data**: 222 student records included
- **🔗 Backend Integration**: Connected to FastAPI ML service
- **📱 Responsive Design**: Works on all devices

**Access your dashboard at**: http://localhost:3000

**To stop the server**: Press `Ctrl + C` in the Command Prompt

**To start again later**: Run `start-dashboard.bat` or `npm run dev`
