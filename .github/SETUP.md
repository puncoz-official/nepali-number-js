# GitHub Actions Setup Guide

This guide explains how to set up and use the GitHub Actions workflows for the nepali-number package.

## 🔧 Required Secrets

Before using the workflows, you need to set up the following secrets in your GitHub repository:

### Repository Secrets (Settings → Secrets and variables → Actions)

1. **`NPM_TOKEN`** (Required for publishing)
   - Go to [npmjs.com](https://www.npmjs.com) → Account → Access Tokens
   - Create a new "Automation" token
   - Copy the token and add it as `NPM_TOKEN` in GitHub secrets

2. **`CODECOV_TOKEN`** (Optional for coverage reports)
   - Go to [codecov.io](https://codecov.io) and connect your repository
   - Copy the repository token
   - Add it as `CODECOV_TOKEN` in GitHub secrets

## 📋 Workflows Overview

### 1. Test Workflow (`.github/workflows/test.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Manual dispatch

**Features:**
- Tests on multiple OS (Ubuntu, Windows, macOS)
- Tests on multiple Node.js versions (18, 20, 22)
- Runs type checking, linting, tests, and build
- Uploads coverage reports to Codecov
- Tests package installation

### 2. Publish Workflow (`.github/workflows/publish.yml`)

**Triggers:**
- Push to tags matching `v*` pattern
- Manual dispatch with version type selection

**Features:**
- Automatic version bumping (patch, minor, major)
- Runs full test suite before publishing
- Publishes to NPM with proper authentication
- Creates GitHub releases with changelog
- Supports dry-run mode for testing
- Prevents duplicate version publishing

### 3. Release Workflow (`.github/workflows/release.yml`)

**Triggers:**
- Push to `main` branch
- Manual dispatch with release type selection

**Features:**
- Analyzes commits for automatic version bumping
- Supports conventional commits
- Generates automatic changelog
- Creates GitHub releases
- Triggers publish workflow automatically

## 🚀 Usage Instructions

### Automatic Releases (Recommended)

1. **Use Conventional Commits:**
   ```bash
   git commit -m "feat: add new number formatting feature"     # Minor version bump
   git commit -m "fix: resolve parsing issue with decimals"   # Patch version bump
   git commit -m "feat!: breaking change in API"              # Major version bump
   ```

2. **Push to main branch:**
   ```bash
   git push origin main
   ```

3. **The workflow will automatically:**
   - Analyze your commits
   - Determine the appropriate version bump
   - Run tests
   - Create a GitHub release
   - Publish to NPM

### Manual Releases

#### Option 1: Manual Release Creation
1. Go to Actions → Release → Run workflow
2. Select release type (auto, patch, minor, major, prerelease)
3. Click "Run workflow"

#### Option 2: Manual Publishing
1. Go to Actions → Publish to NPM → Run workflow
2. Select version type and dry-run option
3. Click "Run workflow"

#### Option 3: Tag-based Publishing
```bash
# Create and push a tag
git tag v1.2.3
git push origin v1.2.3
```

## 📊 Version Bumping Strategy

### Automatic Version Detection
The release workflow analyzes commit messages to determine version bumps:

- **Major (x.0.0)**: Commits with `!` (breaking changes) or `feat!:`
- **Minor (x.y.0)**: Commits starting with `feat:` or `feature:`
- **Patch (x.y.z)**: Commits starting with `fix:`, `bugfix:`, or `perf:`

### Manual Override
You can override automatic detection by:
1. Using manual workflow dispatch
2. Selecting specific version type
3. The workflow will respect your choice

## 🔒 Security Best Practices

### Environment Protection
- The publish workflow uses a `production` environment
- Consider setting up environment protection rules
- Require reviews for production deployments

### Token Security
- NPM tokens are scoped to automation only
- Tokens have minimal required permissions
- Regularly rotate authentication tokens

### Branch Protection
- Protect `main` branch with required status checks
- Require pull request reviews
- Enable "Restrict pushes that create files"

## 🐛 Troubleshooting

### Common Issues

1. **NPM Token Invalid**
   ```
   Error: 401 Unauthorized
   ```
   - Check if `NPM_TOKEN` secret is set correctly
   - Verify token has publish permissions
   - Ensure token hasn't expired

2. **Version Already Exists**
   ```
   Error: Version 1.2.3 already exists on NPM
   ```
   - The workflow prevents duplicate publishing
   - Bump version manually or wait for next commit

3. **Tests Failing**
   ```
   Error: Tests failed
   ```
   - Fix failing tests before publishing
   - Check test logs in Actions tab
   - Ensure all dependencies are installed

4. **Build Errors**
   ```
   Error: Build failed
   ```
   - Check TypeScript compilation errors
   - Verify all imports are correct
   - Ensure build script exists in package.json

### Debug Mode

Enable debug logging by setting repository variable:
- Name: `ACTIONS_STEP_DEBUG`
- Value: `true`

## 📈 Monitoring

### Status Badges
Add these badges to your README:

```markdown
[![Test](https://github.com/username/nepali-number-js/actions/workflows/test.yml/badge.svg)](https://github.com/username/nepali-number-js/actions/workflows/test.yml)
[![Publish](https://github.com/username/nepali-number-js/actions/workflows/publish.yml/badge.svg)](https://github.com/username/nepali-number-js/actions/workflows/publish.yml)
```

### Notifications
- GitHub will send email notifications for workflow failures
- Consider setting up Slack/Discord webhooks for team notifications
- Monitor NPM download statistics

## 🔄 Workflow Customization

### Modifying Test Matrix
Edit `.github/workflows/test.yml`:
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    node-version: [18, 20, 22]  # Add/remove versions as needed
```

### Changing Branch Triggers
Edit workflow `on` sections:
```yaml
on:
  push:
    branches: [main, develop, staging]  # Add your branches
  pull_request:
    branches: [main, develop]
```

### Custom Release Notes
Modify the changelog generation in `release.yml` to match your commit conventions.

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

---

For questions or issues with the workflows, please open an issue in the repository.