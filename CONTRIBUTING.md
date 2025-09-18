# Contributing to Student Performance Dashboard

Thank you for your interest in contributing to the Student Performance Dashboard! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git

### Setup Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/student-frontend.git
   cd student-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow the existing code structure and naming conventions
- Use Tailwind CSS for styling
- Ensure components are responsive and accessible

### Component Structure
```typescript
// Component template
'use client'

import React from 'react'
import { ComponentProps } from '@/types/component'

interface MyComponentProps {
  // Define props here
}

export default function MyComponent({ prop1, prop2 }: MyComponentProps) {
  return (
    <div className="component-wrapper">
      {/* Component content */}
    </div>
  )
}
```

### File Organization
- Components: `/src/components/`
- Pages: `/src/app/`
- Types: `/src/types/`
- Utilities: `/src/lib/`
- Styles: `/src/app/globals.css`

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests
- Write unit tests for utility functions
- Write integration tests for components
- Use React Testing Library for component tests

## 📊 Data Handling

### CSV Format
Ensure any changes to CSV handling maintain compatibility with:
- Required columns: name, math, science, english, skill, attention
- Score ranges: 0-100 for subjects and skills, 0-10 for attention
- Proper validation and error handling

### Analytics
When modifying analytics functions:
- Maintain backward compatibility
- Add proper error handling
- Include comprehensive documentation
- Test with various data sets

## 🎨 UI/UX Guidelines

### Design Principles
- **Responsive First**: Design for mobile, enhance for desktop
- **Accessibility**: Follow WCAG 2.1 AA guidelines
- **Performance**: Optimize for fast loading and smooth interactions
- **Consistency**: Use the established design system

### Color Scheme
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

## 🔧 Adding New Features

### Feature Request Process
1. Create an issue describing the feature
2. Discuss implementation approach
3. Create a feature branch
4. Implement with tests
5. Submit pull request

### Chart Components
When adding new chart types:
- Use Recharts library
- Ensure responsive design
- Add proper tooltips and legends
- Include accessibility features

## 📋 Pull Request Process

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Build succeeds without warnings
- [ ] Documentation updated if needed
- [ ] Responsive design tested
- [ ] Accessibility checked

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Cross-browser testing done

## Screenshots
Include screenshots for UI changes
```

## 🐛 Bug Reports

### Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
```

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recharts](https://recharts.org/en-US/)

### Tools
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 🤝 Community

### Communication
- GitHub Issues for bug reports and feature requests
- GitHub Discussions for general questions
- Pull Requests for code contributions

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow project guidelines

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Project documentation

Thank you for contributing to making education data analysis better! 🎓
