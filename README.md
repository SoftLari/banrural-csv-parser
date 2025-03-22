# Banrural CSV Parser

A utility to parse and process Banrural bank statements in CSV format.

## Usage Examples

The package includes example scripts that can be run using `tsx` or `bun`.

### Generate a Sample Statement

To generate a sample statement to test with:

```bash
# Generate with default name (sample-statement.csv)
tsx examples/generate-sample.ts

# Specify output path
tsx examples/generate-sample.ts ./my-sample.csv
```

### Parse a CSV File

To parse a CSV file and display the results:

```bash
tsx examples/parse-csv.ts path-to-your-csv-file.csv
```

This will output the parsed information including:

- Account information
- Statement period
- List of transactions
- Financial summary

## API

The library exports the following functions:

```typescript
// Parse from a file path
parseFromFile(filePath: string): BanruralStatement

// Parse from a string content
parseFromString(content: string): BanruralStatement

// Create a sample statement with fictional data
createSampleStatement(): BanruralStatement

// Export statement to CSV format
exportToCsv(statement: BanruralStatement): string

// Save statement to a CSV file
saveToFile(statement: BanruralStatement, filePath: string): void
```

## Running with Bun

The examples can also be run with Bun:

```bash
# Generate a sample
bun examples/generate-sample.ts

# Parse a file
bun examples/parse-csv.ts path-to-your-csv-file.csv
```
