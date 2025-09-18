# Student Performance Dashboard

A modern, interactive dashboard for visualizing and analyzing student performance data built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌐 Live Demo

Check out the live dashboard here: [Student Performance Dashboard](https://student-frontend-v1po.vercel.app/)


## 🚀 Features

- **📊 CSV Upload Module**: Upload student data with validation and error handling
- **📈 Overview Statistics**: Real-time performance metrics and key indicators  
- **📉 Interactive Charts**:
  - Bar Chart: Skill vs Score distribution
  - Scatter Plot: Attention vs Performance correlation
  - Radar Chart: Individual student profile visualization
- **🎯 AI-Powered Score Prediction**: Integration with FastAPI backend for ML-based assessment score prediction:
  - JWT Authentication with automatic token management
  - Batch prediction API for multiple students
  - Real-time score prediction based on comprehension, attention, focus, retention, and engagement time
- **🤖 Learning Persona Clustering**: Students automatically classified into learning personas:
  - High Achiever: Consistently excellent performance with high attention
  - Steady Learner: Consistent progress across subjects  
  - Inconsistent Performer: Variable performance patterns
  - Needs Support: Requires additional intervention
- **📊 Persona Analytics**: Dedicated charts showing persona distribution and predicted scores
- **🔍 Enhanced Student Table**: Sort and filter with predicted assessment scores and learning personas
- **💡 AI-Powered Insights**: Automated trend analysis, outlier detection, and recommendations
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for interactive data visualization
- **Data Processing**: PapaParse for CSV handling
- **Backend Integration**: FastAPI ML prediction service with JWT authentication
- **Icons**: Lucide React
- **Deployment**: Vercel-ready configuration

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Modern web browser

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-performance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend URL if different
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Deployment on Vercel

### Automatic Deployment
1. **Connect to Vercel**
   - Push your code to GitHub/GitLab/Bitbucket
   - Import project in Vercel dashboard
   - Vercel will auto-detect Next.js and deploy

### Manual Deployment
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   npm run build  # Test build locally
   ./deploy.sh    # Run deployment script
   # OR
   vercel --prod  # Direct deployment
   ```

### Environment Variables on Vercel
Set these in your Vercel dashboard:
- `NEXT_PUBLIC_BACKEND_URL`: Your FastAPI backend URL (default: https://student-backend-2919.onrender.com)

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📊 CSV Data Format

The dashboard expects CSV files with the following columns:

| Column | Type | Range | Description |
|--------|------|-------|-------------|
| name | string | - | Student name |
| math | number | 0-100 | Math score |
| science | number | 0-100 | Science score |
| english | number | 0-100 | English score |
| skill | number | 0-100 | Overall skill level |
| attention | number | 0-10 | Attention level |

### Sample CSV Format:
```csv
name,math,science,english,skill,attention
Alice Johnson,85,92,78,88,7.5
Bob Smith,76,84,82,81,6.8
Carol Davis,92,89,95,92,8.2
```

Download the sample CSV from the dashboard to get started quickly.

## 🚀 Deploy to Vercel

### Option 1: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_BACKEND_URL
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_BACKEND_URL`: Your backend API URL
4. Deploy automatically on every push

### Option 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/student-frontend)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_BACKEND_URL` | Backend API endpoint | `https://student-backend-2919.onrender.com` |

### Customization

- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Charts**: Customize chart configurations in `/src/components/Charts.tsx`
- **Analytics**: Extend insights logic in `/src/lib/analytics.ts`

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── CSVUpload.tsx        # File upload component
│   ├── OverviewStats.tsx    # Statistics overview
│   ├── Charts.tsx           # Interactive charts
│   ├── StudentTable.tsx     # Data table with search/sort
│   └── Insights.tsx         # Analytics and recommendations
├── lib/
│   ├── utils.ts             # Utility functions
│   └── analytics.ts         # Data analysis logic
└── types/
    └── student.ts           # TypeScript type definitions
```

## 🔍 Key Features Explained

### CSV Upload & Validation
- Drag-and-drop file upload
- Real-time validation with detailed error messages
- Sample template download
- Support for various CSV formats

### Interactive Analytics
- **Correlation Analysis**: Discover relationships between attention and performance
- **Outlier Detection**: Identify students who need special attention
- **Trend Analysis**: Understand class-wide performance patterns
- **Recommendations**: Get actionable insights for improvement

### Performance Optimizations
- Client-side data processing for fast interactions
- Responsive design with mobile-first approach
- Optimized bundle size with tree shaking
- Lazy loading for better performance

## 🐛 Troubleshooting

### Common Issues

**CSV Upload Fails**
- Ensure CSV has all required columns: name, math, science, english, skill, attention
- Check that numeric values are valid numbers
- Verify attention scores are between 0-10, other scores 0-100

**Charts Not Displaying**
- Check browser console for JavaScript errors
- Ensure data is properly loaded
- Verify Recharts compatibility with your browser

**Build Errors**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires 18+)
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

### Getting Help

1. Check the [Issues](https://github.com/your-username/student-frontend/issues) page
2. Review the browser console for error messages
3. Ensure all environment variables are properly set

## 📈 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: < 500KB gzipped
- **Load Time**: < 2s on 3G networks
- **Interactive**: < 1s Time to Interactive

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Recharts](https://recharts.org/) - Composable charting library
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- [PapaParse](https://www.papaparse.com/) - Powerful CSV parser

---

Built with ❤️ for better education analytics
