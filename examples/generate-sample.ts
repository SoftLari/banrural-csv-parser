#!/usr/bin/env node

import { createSampleStatement, saveToFile } from "../src/index";
import path from "path";

// Check if a file path was provided as a command-line argument
let outputPath = "./sample-statement.csv";

if (process.argv.length >= 3) {
  outputPath = process.argv[2];
}

const resolvedPath = path.resolve(process.cwd(), outputPath);

try {
  // Create a sample statement
  console.log("Generating sample Banrural statement...");
  const sampleStatement = createSampleStatement();

  // Save to file
  saveToFile(sampleStatement, resolvedPath);
  console.log(`Sample statement saved to: ${resolvedPath}`);

  // Display a message about how to use the parse-csv.ts script with this sample
  console.log("\nYou can now parse this sample using the parse-csv.ts script:");
  console.log(`  tsx parse-csv.ts ${outputPath}`);
} catch (error) {
  console.error("Error generating sample statement:");
  console.error(error);
  process.exit(1);
}
