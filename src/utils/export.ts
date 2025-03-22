import { stringify } from "csv-stringify/sync";
import { BanruralStatement, BanruralTransaction } from "../types/index.js";

/**
 * Formats a date as DD/MM/YYYY
 */
export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Formats the header section of the statement
 */
export function formatHeader(statement: BanruralStatement): string {
  const { header } = statement;
  const title = header.title;
  const dateRange = `Del ${formatDate(header.dateRange.from)} al ${formatDate(
    header.dateRange.to
  )}`;
  const account = `Cuenta: ${header.account.accountNumber}-${header.account.accountType}-${header.account.accountAlias}-${header.account.currency}`;

  return `${title}\n${dateRange}\n${account}`;
}

/**
 * Formats a transaction row for CSV export
 */
export function formatTransaction(transaction: BanruralTransaction): string[] {
  const debit =
    transaction.amount < 0 ? Math.abs(transaction.amount).toString() : "0";
  const credit = transaction.amount > 0 ? transaction.amount.toString() : "0";

  return [
    formatDate(transaction.date),
    transaction.office,
    transaction.description,
    transaction.reference,
    transaction.sequence,
    transaction.paymentMethod,
    debit,
    credit,
    transaction.accountingBalance.toString(),
    transaction.availableBalance.toString(),
  ];
}

/**
 * Exports a Banrural statement as a CSV string
 */
export function exportToCsv(statement: BanruralStatement): string {
  // Format the header section
  const headerSection = formatHeader(statement);

  // Format the column headers
  const columnHeaders = [
    "Fecha",
    "Oficina",
    "Descripción",
    "Referencia",
    "Secuencial",
    "Cheque Propio / Local / Efectivo",
    "Débito (-)",
    "Crédito (+)",
    "Saldo Contable",
    "Saldo Disponible",
  ];

  // Format transactions
  const rows = statement.transactions.map(formatTransaction);

  // Create CSV content for transactions
  const csvTransactions = stringify([columnHeaders, ...rows], {
    header: false,
  });

  // Combine header section and transactions
  return `${headerSection}\n\n${csvTransactions}\nConfidencial`;
}
