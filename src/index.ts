import * as fs from "fs";

import { parseStatementContent } from "./utils/csv-parser";
import { exportToCsv } from "./utils/export";

import type { BanruralStatement } from "./types/index";

/**
 * Parse a Banrural CSV statement from a file
 */
function parseFromFile(filePath: string): BanruralStatement {
  const content = fs.readFileSync(filePath, "utf8");
  return parseStatementContent(content);
}

/**
 * Parse a Banrural CSV statement from a string
 */
function parseFromString(content: string): BanruralStatement {
  return parseStatementContent(content);
}

/**
 * Create a sample statement with fictional data
 */
function createSampleStatement(): BanruralStatement {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  return {
    header: {
      title: "Movimientos de la Cuenta",
      dateRange: {
        from: twoDaysAgo,
        to: today,
      },
      account: {
        accountNumber: "1234",
        accountType: "Monetario",
        accountAlias: "EXAMPLE COMPANY",
        currency: "GTQ",
      },
    },
    transactions: [
      {
        date: twoDaysAgo,
        office: "827",
        description: "DEPOSITO INICIAL CTA CORRIENTES",
        reference: "12345678",
        sequence: "123456789",
        paymentMethod: "EFECTIVO",
        amount: 5000,
        accountingBalance: 5000,
        availableBalance: 5000,
      },
      {
        date: yesterday,
        office: "996",
        description: "N/CREDITO DEPOSITO COMPLETO CAJA RURAL",
        reference: "87654321",
        sequence: "987654321",
        paymentMethod: "EFECTIVO",
        amount: 7500,
        accountingBalance: 12500,
        availableBalance: 12500,
      },
      {
        date: yesterday,
        office: "885",
        description: "DEPOSITO COMPLETO",
        reference: "23456789",
        sequence: "234567890",
        paymentMethod: "EFECTIVO",
        amount: 15000,
        accountingBalance: 27500,
        availableBalance: 27500,
      },
      {
        date: today,
        office: "885",
        description: "OPERACION CHEQUE PROPIO",
        reference: "1",
        sequence: "345678901",
        paymentMethod: "",
        amount: -1500,
        accountingBalance: 26000,
        availableBalance: 26000,
      },
      {
        date: today,
        office: "948",
        description: "PAGO PRUEBA, TEST",
        reference: "34567890",
        sequence: "456789012",
        paymentMethod: "EFECTIVO",
        amount: 2058,
        accountingBalance: 28058,
        availableBalance: 28058,
      },
    ],
  };
}

/**
 * Save a statement to a CSV file
 */
function saveToFile(statement: BanruralStatement, filePath: string): void {
  const csvContent = exportToCsv(statement);
  fs.writeFileSync(filePath, csvContent);
}

// Export the public API
export {
  parseFromFile,
  parseFromString,
  exportToCsv,
  createSampleStatement,
  saveToFile,
};
