import { parse } from "csv-parse/sync";
import {
  BanruralStatement,
  BanruralTransaction,
  BanruralAccountInfo,
} from "../types/index.js";

/**
 * Parses a date string in the format DD/MM/YYYY
 */
export function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Parses the date range from the header line
 */
export function parseDateRange(line: string): { from: Date; to: Date } {
  // Extract dates from format: 'Del DD/MM/YYYY al DD/MM/YYYY'
  const dateMatch = line.match(
    /Del (\d{2}\/\d{2}\/\d{4}) al (\d{2}\/\d{2}\/\d{4})/
  );

  if (!dateMatch || dateMatch.length < 3) {
    throw new Error(`Could not parse date range from: ${line}`);
  }

  return {
    from: parseDate(dateMatch[1]),
    to: parseDate(dateMatch[2]),
  };
}

/**
 * Parses account information from the header line
 */
export function parseAccountInfo(line: string): BanruralAccountInfo {
  // Try normal format first: 'Cuenta: 1234-Monetario-EXAMPLE COMPANY-GTQ'
  let accountMatch = line.match(/Cuenta: (\d+)-([^-]+)-([^-]+)-([A-Z]+)/);

  // If that fails, try the format with XXXXXX prefix: 'Cuenta: XXXXXX1234-Monetario-EXAMPLE COMPANY-GTQ'
  if (!accountMatch) {
    accountMatch = line.match(/Cuenta: XXXXXX(\d+)-([^-]+)-([^-]+)-([A-Z]+)/);
  }

  if (!accountMatch || accountMatch.length < 5) {
    throw new Error(`Could not parse account info from: ${line}`);
  }

  return {
    accountNumber: accountMatch[1],
    accountType: accountMatch[2],
    accountAlias: accountMatch[3],
    currency: accountMatch[4],
  };
}

/**
 * Parses a transaction row from the CSV
 */
export function parseTransaction(row: string[]): BanruralTransaction {
  const [
    dateStr,
    office,
    description,
    reference,
    sequence,
    paymentMethod,
    debitStr,
    creditStr,
    accountingBalanceStr,
    availableBalanceStr,
  ] = row;

  const debit = debitStr ? parseFloat(debitStr) : 0;
  const credit = creditStr ? parseFloat(creditStr) : 0;

  return {
    date: parseDate(dateStr),
    office,
    description,
    reference,
    sequence,
    paymentMethod,
    amount: credit - debit, // Credit is positive, debit is negative
    accountingBalance: parseFloat(accountingBalanceStr),
    availableBalance: parseFloat(availableBalanceStr),
  };
}

/**
 * Parses a Banrural bank statement CSV content
 */
export function parseStatementContent(content: string): BanruralStatement {
  // Split content into lines and remove empty lines
  const lines = content.split("\n").filter((line) => line.trim().length > 0);

  if (lines.length < 5) {
    throw new Error("CSV content is too short to be a valid bank statement");
  }

  // Parse header information
  const title = lines[0];
  const dateRange = parseDateRange(lines[1]);
  const account = parseAccountInfo(lines[2]);

  // Parse transactions
  // First, find the header row that contains column names (usually line 4)
  const headerRowIndex = lines.findIndex(
    (line) => line.includes("Fecha") && line.includes("Oficina")
  );

  if (headerRowIndex === -1) {
    throw new Error("Could not find transaction header row in CSV");
  }

  // Parse the rest of the lines as CSV rows
  const transactionRows = lines.slice(headerRowIndex + 1);

  // Remove any footer rows that might not be transactions
  const transactions: BanruralTransaction[] = [];

  // Parse the transaction rows
  // The CSV might have commas in description fields, so we need to be careful
  // We'll use the csv-parse library for robust parsing
  for (const rowStr of transactionRows) {
    // Skip any footer rows like "Confidencial"
    if (rowStr.trim() === "Confidencial") continue;

    try {
      // Use csv-parse to properly handle quoted fields and commas in description
      const [parsedRow] = parse(rowStr, {
        delimiter: ",",
        columns: false, // Raw array format
        skip_empty_lines: true,
        relax_column_count: true, // Allow rows to have different number of columns
      });

      if (parsedRow && parsedRow.length >= 10) {
        transactions.push(parseTransaction(parsedRow));
      }
    } catch (error) {
      console.error(`Error parsing transaction row: ${rowStr}`, error);
    }
  }

  return {
    header: {
      title,
      dateRange,
      account,
    },
    transactions,
  };
}
