// ESM example (using import)
import { parseFromString, createSampleStatement } from "banrural-csv-parser";

console.log("Banrural CSV Parser - ESM Test");
console.log("===============================");

// Create a sample statement
const sampleStatement = createSampleStatement();

// Define a function to display transaction information
const showTransaction = (transaction) => {
  console.log(`  Date: ${transaction.date.toISOString().slice(0, 10)}`);
  console.log(`  Office: ${transaction.office}`);
  console.log(`  Description: ${transaction.description}`);
  console.log(`  Amount: ${transaction.amount}`);
  console.log(`  Available Balance: ${transaction.availableBalance}`);
};

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
  showTransaction(transaction);
});

// Parse a simple CSV string
const csvContent = `
MOVIMIENTOS DE LA CUENTA;PERIODO: 01/03/2025 AL 22/03/2025;;;;;;;
NO. CUENTA: 3001;TIPO: MONETARIO;ALIAS: EXAMPLE COMPANY;MONEDA: GTQ;;;;;
FECHA;AGENCIA;DESCRIPCION;REFERENCIA;SECUENCIA;FORMA DE PAGO;MONTO;SALDO CONTABLE;SALDO DISPONIBLE
01/03/2025;827;DEPOSITO PRUEBA;12345678;123456789;EFECTIVO;5000.00;5000.00;5000.00
`;

try {
  const parsedStatement = parseFromString(csvContent);
  console.log("\nParsed CSV statement:");
  console.log(
    `Account Number: ${parsedStatement.header.account.accountNumber}`
  );
  console.log(`Transactions: ${parsedStatement.transactions.length}`);

  if (parsedStatement.transactions.length > 0) {
    console.log("\nFirst transaction:");
    showTransaction(parsedStatement.transactions[0]);
  }
} catch (error) {
  console.error("Error parsing CSV:", error);
}

console.log("\nTest completed successfully!");
