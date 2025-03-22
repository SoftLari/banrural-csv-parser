# 📊 TransactionTracker: Banrural CSV Parser Changelog

All notable changes to this project will be documented in this file.

## [1.0.3] - 2025-03-22

### 🛠️ Fixed

- Added proper dual module support (ESM and CommonJS)
- Fixed direct type imports (no need to import from /dist/types)
- Simplified package structure with better entry points
- Fixed compatibility with require() in CommonJS environments

## [1.0.2] - 2025-03-22

### 🛠️ Fixed

- Fixed package.json exports configuration to properly define the main entry point
- Resolved compatibility issues when importing the library in other projects

## [1.0.1] - 2025-03-22

### 🔧 Technical

- Fix setup

## [1.0.0] - 2025-03-22

### 🚀 Added

- Initial release of the Banrural CSV Parser
- Core functionality to parse Banrural bank statements in CSV format
- Support for extracting account information, statement period, and transactions
- CSV export capabilities
- Sample statement generator for testing

### 🔧 Technical

- TypeScript implementation with strong typing
- Vitest test framework setup
- Support for running with both Node.js and Bun

## How to Use This Changelog

Each version includes the following sections when relevant:

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Features that will be removed in upcoming releases
- **Removed**: Features removed in this release
- **Fixed**: Bug fixes
- **Security**: Security vulnerability fixes
