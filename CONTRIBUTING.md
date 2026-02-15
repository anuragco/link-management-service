# Contributing to URL Shortener

First off, thank you for considering contributing to URL Shortener! 🎉

It's people like you that make URL Shortener such a great tool. We welcome contributions from everyone, whether it's a bug report, feature request, documentation improvement, or code contribution.

## 💖 Ways to Contribute

There are many ways to contribute to this project:

- 🐛 **Report bugs** - Found a bug? Let us know!
- 💡 **Suggest features** - Have ideas for new features?
- 📝 **Improve documentation** - Help others understand the project better
- 🔧 **Submit pull requests** - Fix bugs or implement features
- ⭐ **Star the repository** - Show your support!
- 📢 **Spread the word** - Share the project with others

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.x or higher)
- MongoDB (Atlas account or local installation)
- Docker (optional, for containerized development)
- Git

### Setting Up Your Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/url-shortener.git
   cd url-shortener/Backend
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/url-shortener.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection
   ```

6. **Run the application**
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### Creating a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests

### Making Changes

1. Make your changes in your feature branch
2. Test your changes thoroughly
3. Follow the existing code style
4. Write clear, descriptive commit messages

### Commit Guidelines

Write clear and meaningful commit messages:

```bash
# Good examples
git commit -m "Add click tracking feature"
git commit -m "Fix MongoDB connection timeout issue"
git commit -m "Update README with Docker instructions"

# Use present tense
# Be specific and descriptive
# Reference issues when applicable: "Fix #123"
```

### Testing Your Changes

Before submitting a PR:

```bash
# Run the application
npm run dev

# Test all features:
# - Create shortened URLs
# - Test redirects
# - Verify click tracking
# - Check responsive design
# - Test error handling

# Check for errors
npm audit
```

### Submitting a Pull Request

1. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request on GitHub**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out the PR template

3. **PR Description should include:**
   - What changes you made
   - Why you made them
   - How to test them
   - Screenshots (if UI changes)
   - Related issues (if any)

## 📋 Pull Request Checklist

Before submitting your PR, make sure:

- [ ] Code follows the existing style
- [ ] Changes have been tested
- [ ] Documentation updated (if needed)
- [ ] No console errors or warnings
- [ ] Commit messages are clear
- [ ] PR description is complete

## 🎨 Code Style Guidelines

### JavaScript

- Use `const` and `let`, avoid `var`
- Use async/await instead of callbacks
- Follow existing indentation (2 spaces)
- Add comments for complex logic
- Use meaningful variable names

### Example:

```javascript
// Good
const createShortUrl = async (originalUrl) => {
  const shortId = generateId();
  return await saveToDatabase(shortId, originalUrl);
};

// Avoid
function createUrl(url) {
  var id = getId();
  saveUrl(id, url, function(err, result) {
    // callback hell
  });
}
```

### File Organization

- Controllers handle business logic
- Routes define endpoints
- Models define database schemas
- Views contain templates

## 🐛 Reporting Bugs

Found a bug? Help us fix it!

**Before reporting:**
- Check if the bug has already been reported
- Try to reproduce it in the latest version

**When reporting, include:**
- Clear, descriptive title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, etc.)

**Use this template:**

```markdown
**Bug Description**
A clear description of what the bug is.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 11]
- Node Version: [e.g., 22.0.0]
- Browser: [e.g., Chrome 98]
```

## 💡 Suggesting Features

Have an idea for a new feature?

**Before suggesting:**
- Check if it's already been suggested
- Consider if it fits the project scope

**When suggesting, include:**
- Clear description of the feature
- Why it would be useful
- Possible implementation approach
- Examples from other projects (if any)

## 📖 Documentation

Help improve our documentation:

- Fix typos and grammar
- Add examples
- Clarify confusing sections
- Translate to other languages
- Create tutorials

## 🔍 Code Review Process

1. Maintainers review all PRs
2. Feedback provided within a few days
3. Address requested changes
4. Once approved, PR will be merged

## 🎯 Priority Areas

We especially welcome contributions in:

- [ ] Rate limiting implementation
- [ ] Custom URL aliases
- [ ] QR code generation
- [ ] Advanced analytics
- [ ] API documentation
- [ ] Unit/integration tests
- [ ] Performance optimizations
- [ ] Accessibility improvements

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Being respectful and inclusive
- Accepting constructive criticism
- Focusing on what's best for the community
- Showing empathy towards others

**Unacceptable behavior includes:**
- Harassment or discriminatory comments
- Trolling or insulting remarks
- Publishing others' private information
- Other unprofessional conduct

## 💬 Questions?

Feel free to:
- Open an issue for questions
- Join discussions
- Reach out to maintainers

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

Happy Coding! 🚀
