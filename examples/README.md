# Banrural CSV Parser Examples

This directory contains examples showing how to use the `banrural-csv-parser` library.

## Quick Start Examples

### CommonJS Example (with require)

This example demonstrates importing the library using CommonJS syntax (require).

```bash
cd local-test-cjs
npm install
npm start
```

### ESM Example (with import)

This example demonstrates importing the library using ESM syntax (import).

```bash
cd local-test-esm
npm install
npm start
```

## Examples of Integration

- `parse-csv.ts`: Shows how to parse Banrural CSV statements
- `generate-sample.ts`: Demonstrates how to generate a sample statement

## Running the TypeScript Examples

The TypeScript examples can be run using:

```bash
npx tsx examples/parse-csv.ts
npx tsx examples/generate-sample.ts
```

## Testing Local Changes

The examples in `local-test-cjs` and `local-test-esm` are set up to use the local version of the package. This is useful for testing changes without publishing.

To test your local changes:

1. Make your changes to the library
2. Build the library: `npm run build`
3. Run the examples: `cd examples/local-test-cjs && npm start`

This approach helps verify that your changes work correctly with both CommonJS and ESM imports.
