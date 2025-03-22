# Deploy Instructions for Banrural CSV Parser

This document outlines the steps to release a new version of the `banrural-csv-parser` package.

## Prerequisites

- Access to the GitHub repository with push permissions
- NPM account with publish access to the package
- Node.js installed (versions 18, 20, or 22 recommended)

## Release Process

Follow these steps to release a new version:

### 1. Update Version Number

1. Update the version in `package.json`:

```bash
# For patch version (bug fixes)
npm version patch

# For minor version (new features, backward compatible)
npm version minor

# For major version (breaking changes)
npm version major
```

This command will update the version in package.json and create a git tag.

### 2. Create a Git Tag

If you didn't use the `npm version` command which automatically creates a tag, create a tag manually:

```bash
# Get current version from package.json
VERSION=$(node -p "require('./package.json').version")

# Create an annotated tag
git tag -a "v$VERSION" -m "Release v$VERSION"
```

### 3. Update Changelog

1. Update `CHANGELOG.md` with details about the new release:
   - Add a new section with the new version number and date
   - List all changes under appropriate categories (Added, Changed, Fixed, etc.)
   - Include links to relevant issues or pull requests

### 4. Build and Test

1. Build the package:

```bash
yarn build
```

2. Run tests to ensure everything is working:

```bash
yarn test
```

### 5. Commit and Push Changes

1. Commit the version change and updated changelog:

```bash
git add package.json CHANGELOG.md
git commit -m "Release v$(node -p "require('./package.json').version")"
```

2. Push the changes and the tag:

```bash
git push origin main
git push origin --tags
```

### 6. Create a GitHub Release

1. Go to the repository on GitHub
2. Navigate to "Releases" section
3. Click "Create a new release"
4. Select the tag you just pushed
5. Title the release with the version (e.g., "v1.0.1")
6. Copy the relevant section from CHANGELOG.md into the description
7. Click "Publish release"

The GitHub Actions workflow will automatically:

- Run tests across Node.js 18, 20, and 22
- Publish the package to npm using Node.js 20 when the release is published

### 7. Verify the Publication

1. Check that the GitHub Actions workflow completed successfully
2. Verify the package is available on npm:

```bash
npm view banrural-csv-parser version
```

## Troubleshooting

If the automatic publication fails:

1. Check the GitHub Actions logs for errors
2. If needed, publish manually:

```bash
npm login  # Login to npm
npm publish  # Publish the package
```

Remember to set the NPM_TOKEN secret in your GitHub repository settings if you haven't already.
