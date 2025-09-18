# 🚀 Quick Start Guide - Virtual Environment Setup

## 🎯 Choose Your Setup Method

### Method 1: Automated Setup (Recommended) ⚡

**For Windows Command Prompt:**
```cmd
cd "C:\Users\Jayanth Raj G\OneDrive\Documents\student-frontend"
setup-clean-env.bat
```

**For PowerShell:**
```powershell
cd "C:\Users\Jayanth Raj G\OneDrive\Documents\student-frontend"
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\setup-environment.ps1
```

### Method 2: Docker (Complete Isolation) 🐳

**Prerequisites:**
- Install Docker Desktop for Windows

**Quick Start:**
```cmd
cd "C:\Users\Jayanth Raj G\OneDrive\Documents\student-frontend"

# Development mode with hot reload
docker-compose --profile dev up student-dashboard-dev

# Production mode
docker-compose up student-dashboard

# Access at: http://localhost:3000 (production) or http://localhost:3001 (dev)
```

### Method 3: Manual Setup (Step by Step) 🔧

**Step 1: Install Node.js**
- Download: https://nodejs.org/dist/v18.18.0/node-v18.18.0-x64.msi
- Install and restart your terminal

**Step 2: Setup Project**
```cmd
cd "C:\Users\Jayanth Raj G\OneDrive\Documents\student-frontend"

# Clean previous installations
rmdir /s /q node_modules
del package-lock.json
rmdir /s /q .next

# Install dependencies
npm install

# Test build
npm run build

# Start development server
npm run dev
```

## ✅ Verification Steps

After setup, verify everything works:

1. **Server Running**: Check http://localhost:3000
2. **Upload Test**: Upload `sample_students.csv` (222 students)
3. **Charts Render**: Verify interactive charts display
4. **Personas Work**: Check learning persona classification
5. **API Connection**: Verify backend integration

## 🎉 Expected Results

When successful, you should see:
- ✅ Dashboard loads at http://localhost:3000
- ✅ CSV upload accepts sample_students.csv
- ✅ 222 student records processed
- ✅ Learning personas classified (High Achiever, Steady Learner, etc.)
- ✅ Interactive charts and analytics
- ✅ No console errors

## 🔧 Troubleshooting

### Common Issues & Solutions

**Issue: "npm not found"**
```cmd
# Solution: Install Node.js and restart terminal
# Download from: https://nodejs.org/
```

**Issue: "Port 3000 already in use"**
```cmd
# Find and kill process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

**Issue: "Permission denied"**
```cmd
# Run as Administrator or use PowerShell as Admin
# Right-click Command Prompt -> "Run as administrator"
```

**Issue: "Build fails"**
```cmd
# Clear cache and reinstall
npm cache clean --force
rmdir /s /q node_modules
npm install
```

**Issue: "Docker not working"**
```cmd
# Ensure Docker Desktop is running
# Check: docker --version
# Restart Docker Desktop if needed
```

## 🌐 Environment Details

**Development Server:**
- URL: http://localhost:3000
- Hot Reload: Enabled
- Source Maps: Enabled

**Backend API:**
- URL: https://student-backend-2919.onrender.com
- Authentication: JWT (automatic)
- Fallback: Local clustering if offline

**Sample Data:**
- File: sample_students.csv
- Records: 222 students
- Format: student_id, name, class, comprehension, attention, focus, retention, assessment_score, engagement_time

## 📊 Features Available

Once running, you can:
- 📤 Upload CSV files with student data
- 🤖 Get AI-powered learning persona classifications
- 📈 View interactive performance charts
- 📋 Browse sortable student tables
- 💡 Access ML-based insights and recommendations
- 📱 Use on any device (responsive design)

## 🆘 Need Help?

If you encounter issues:
1. Check the console for error messages
2. Verify Node.js version: `node --version` (should be 16+)
3. Ensure all files are in the correct directory
4. Try the automated setup scripts first
5. Use Docker for complete isolation if needed

## 🎯 Next Steps

After successful setup:
1. Explore the dashboard with sample data
2. Try uploading your own CSV files
3. Experiment with different student datasets
4. Deploy to Vercel for production use

Your Student Performance Dashboard is now ready to analyze student data with AI-powered insights! 🎉
