// CommonJS example (using require)
const banruralParser = require("banrural-csv-parser");

console.log("Banrural CSV Parser - CommonJS Test");
console.log("====================================");

// Create a sample statement
const sampleStatement = banruralParser.createSampleStatement();

// Log some data from the sample statement
console.log(`Account Number: ${sampleStatement.header.account.accountNumber}`);
console.log(`Account Type: ${sampleStatement.header.account.accountType}`);
console.log(`Account Alias: ${sampleStatement.header.account.accountAlias}`);
console.log(`Currency: ${sampleStatement.header.account.currency}`);
console.log(`\nTransactions: ${sampleStatement.transactions.length}`);

// Log transaction information
console.log("\nFirst 2 transactions:");
sampleStatement.transactions.slice(0, 2).forEach((transaction, index) => {
  console.log(`\nTransaction #${index + 1}:`);
  console.log(`  Date: ${transaction.date.toISOString().slice(0, 10)}`);
  console.log(`  Office: ${transaction.office}`);
  console.log(`  Description: ${transaction.description}`);
  console.log(`  Amount: ${transaction.amount}`);
  console.log(`  Available Balance: ${transaction.availableBalance}`);
});

console.log("\nTest completed successfully!");
