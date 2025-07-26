# Contributing to Diff Checker Pro

Thank you for your interest in contributing to Diff Checker Pro! 🎉 We welcome contributions from everyone and are grateful for even the smallest fixes!

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)
- [Testing](#testing)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- **Be respectful** and inclusive of all contributors
- **Be constructive** in discussions and feedback
- **Be patient** with newcomers and those learning
- **Be collaborative** and help others when possible

## Getting Started

### Prerequisites

- A modern web browser (Chrome 80+, Firefox 75+, Safari 13+, or Edge 80+)
- Basic knowledge of HTML, CSS, and JavaScript
- Git for version control
- A text editor or IDE

### First Contribution

Look for issues labeled with `good first issue` or `beginner-friendly`. These are specifically chosen to be approachable for newcomers.

## How to Contribute

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title** and description
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Browser and version** information
- **Any error messages** from the console

### 💡 Suggesting Features

We love feature suggestions! When suggesting a feature:

- **Check if it already exists** in issues or discussions
- **Describe the problem** you're trying to solve
- **Explain your proposed solution**
- **Consider the impact** on existing functionality
- **Provide mockups** or examples if helpful

### 🔧 Code Contributions

1. **Fork** the repository
2. **Create a branch** for your feature: `git checkout -b feature-name`
3. **Make your changes** following our style guide
4. **Test thoroughly** on multiple browsers
5. **Commit your changes** with clear messages
6. **Push to your fork**: `git push origin feature-name`
7. **Create a Pull Request**

## Development Setup

### Local Development

1. **Clone your fork**:
   ```bash
   git clone https://github.com/sukarth/diffchecker-pro.git
   cd diffchecker-pro
   ```

2. **Open the project**:
   - Simply open `index.html` in your browser
   - Or use a local server for better development experience:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Start developing**:
   - Make changes to the code
   - Refresh your browser to see changes
   - Use browser dev tools for debugging

### Project Structure

```
diffchecker-pro/
├── index.html          # Main HTML file
├── style.css           # All styles and themes
├── script.js           # Main JavaScript application
├── README.md           # Project documentation
├── LICENSE             # MIT license
├── CONTRIBUTING.md     # This file
└── assets/             # Future: images, icons, etc.
```

## Pull Request Process

### Before Submitting

- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test responsive design on mobile devices
- [ ] Ensure no JavaScript errors in console
- [ ] Check that all features work as expected
- [ ] Follow the code style guidelines
- [ ] Update documentation if needed

### PR Title and Description

- Use a clear, descriptive title
- Reference related issues: "Fixes #123" or "Closes #456"
- Describe what your PR does and why
- Include screenshots for UI changes
- List any breaking changes

### Review Process

1. **Automated checks** will run on your PR
2. **Maintainers will review** your code
3. **Address feedback** promptly and constructively
4. **Tests will be run** across different browsers
5. **Merge** happens after approval

## Style Guide

### HTML

- Use semantic HTML5 elements
- Include proper `alt` attributes for images
- Maintain proper indentation (2 spaces)
- Use lowercase for element names and attributes

```html
<!-- Good -->
<button id="compareBtn" class="primary-btn" title="Compare files">
  Compare
</button>

<!-- Avoid -->
<BUTTON ID="compareBtn" CLASS="primary-btn">Compare</BUTTON>
```

### CSS

- Use CSS custom properties for theming
- Follow BEM naming convention where appropriate
- Group related properties together
- Use meaningful class names

```css
/* Good */
.file-container {
  padding: 1.5rem;
  border-radius: var(--border-radius);
  background: var(--background-color);
  transition: var(--transition);
}

/* Avoid */
.fc {
  padding: 24px;
  border-radius: 8px;
  background: #fff;
}
```

### JavaScript

- Use ES6+ features (classes, arrow functions, const/let)
- Follow camelCase naming convention
- Add JSDoc comments for complex functions
- Handle errors gracefully

```javascript
// Good
class DiffCheckerPro {
  /**
   * Processes text before comparison
   * @param {string} text - The text to process
   * @returns {string} Processed text
   */
  preprocessText(text) {
    let processed = text;
    
    if (this.ignoreWhitespace.checked) {
      processed = processed.replace(/\s+/g, ' ').trim();
    }
    
    return processed;
  }
}

// Avoid
function processText(t) {
  var p = t;
  if (ignoreWS) p = p.replace(/\s+/g, ' ');
  return p;
}
```

### Git Commits

Use conventional commit messages:

```
feat: add character-level diff comparison
fix: resolve mobile layout issues
docs: update README with new features
style: improve button hover animations
refactor: simplify diff rendering logic
test: add browser compatibility tests
```

## Testing

### Manual Testing Checklist

- [ ] **File upload** works correctly
- [ ] **Drag and drop** functions properly
- [ ] **All diff modes** (line, word, character) work
- [ ] **Search functionality** finds matches
- [ ] **Export features** generate correct files
- [ ] **Theme switching** works without issues
- [ ] **Responsive design** looks good on mobile
- [ ] **Keyboard shortcuts** work as expected
- [ ] **Settings** persist correctly
- [ ] **Undo/redo** functions properly

### Browser Testing

Test your changes on:

- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: Chrome Mobile, Safari iOS, Firefox Mobile
- **Tablet**: iPad Safari, Android Chrome

### Accessibility Testing

- Use keyboard navigation only
- Test with screen readers if possible
- Check color contrast ratios
- Ensure all interactive elements are focusable

## Reporting Issues

### Security Issues

For security vulnerabilities, please email directly instead of creating public issues. We'll work with you to resolve the issue promptly.

### Bug Reports

Use this template for bug reports:

```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment**
- Browser: [e.g. Chrome 91]
- OS: [e.g. Windows 10]
- Version: [e.g. 2.0.0]

**Additional Context**
Any other context about the problem.
```

### Feature Requests

Use this template for feature requests:

```markdown
**Feature Description**
A clear description of what you want to happen.

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How do you think this should work?

**Alternatives Considered**
What other solutions did you consider?

**Additional Context**
Any other context or screenshots.
```

## Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub contributors** page

## Questions?

- 💬 **Discussions**: Use GitHub Discussions for questions
- 📧 **Issues**: Create an issue for bugs or feature requests
- 📖 **Documentation**: Check the README.md first

Thank you for contributing to Diff Checker Pro! 🚀
