#!/usr/bin/env node

import { parseFromFile } from "../src/index.js";
import path from "path";

// Check if a file path was provided as a command-line argument
if (process.argv.length < 3) {
  console.error("Usage: tsx parse-csv.ts <path-to-csv-file>");
  console.error("Example: tsx parse-csv.ts ./statements/example.csv");
  process.exit(1);
}

// Get the file path from command-line arguments
const filePath = process.argv[2];
const resolvedPath = path.resolve(process.cwd(), filePath);

try {
  // Parse the CSV file
  console.log(`Parsing CSV file: ${resolvedPath}`);
  const statement = parseFromFile(resolvedPath);

  // Display account information
  console.log("\n=== Account Information ===");
  console.log(`Account Number: ${statement.header.account.accountNumber}`);
  console.log(`Account Type: ${statement.header.account.accountType}`);
  console.log(`Account Alias: ${statement.header.account.accountAlias}`);
  console.log(`Currency: ${statement.header.account.currency}`);

  // Display date range
  console.log("\n=== Statement Period ===");
  console.log(`From: ${statement.header.dateRange.from.toLocaleDateString()}`);
  console.log(`To: ${statement.header.dateRange.to.toLocaleDateString()}`);

  // Display transactions
  console.log("\n=== Transactions ===");
  statement.transactions.forEach((transaction, index) => {
    console.log(`\nTransaction #${index + 1}:`);
    console.log(`  Date: ${transaction.date.toLocaleDateString()}`);
    console.log(`  Description: ${transaction.description}`);
    console.log(`  Reference: ${transaction.reference}`);
    console.log(
      `  Amount: ${transaction.amount.toLocaleString()} ${
        statement.header.account.currency
      }`
    );
    console.log(
      `  Balance: ${transaction.availableBalance.toLocaleString()} ${
        statement.header.account.currency
      }`
    );
  });

  // Display summary
  const totalDeposits = statement.transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = statement.transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  console.log("\n=== Summary ===");
  console.log(
    `Total Deposits: ${totalDeposits.toLocaleString()} ${
      statement.header.account.currency
    }`
  );
  console.log(
    `Total Withdrawals: ${totalWithdrawals.toLocaleString()} ${
      statement.header.account.currency
    }`
  );
  console.log(
    `Final Balance: ${statement.transactions[
      statement.transactions.length - 1
    ].availableBalance.toLocaleString()} ${statement.header.account.currency}`
  );
} catch (error) {
  console.error("Error parsing CSV file:");
  console.error(error);
  process.exit(1);
}
