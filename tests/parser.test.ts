import { describe, it, expect } from "vitest";
import * as path from "path";
import * as fs from "fs";
import {
  parseFromString,
  parseFromFile,
  createSampleStatement,
  exportToCsv,
} from "../src/index.js";

describe("Banrural CSV Parser", () => {
  it("should parse a simple CSV string", () => {
    const csvContent = `Movimientos de la Cuenta
Del 01/01/2025 al 03/02/2025
Cuenta: XXXXXX3689-Monetario-CUENTA CORRIENTE 1-GTQ

Fecha,Oficina,Descripción,Referencia,Secuencial,Cheque Propio / Local / Efectivo,Débito (-),Crédito (+),Saldo Contable,Saldo Disponible
14/01/2025,827,DEPOSITO INICIAL CTA CORRIENTES,85964709,815227977,EFECTIVO,0,5000.0,5000.00,5000.00
14/01/2025,996,N/CREDITO DEPOSITO COMPLETO CAJA RURAL,838305311,838305311,EFECTIVO,0,7940.0,12940.00,12940.00
15/01/2025,885,DEPOSITO COMPLETO,43257931,880050584,EFECTIVO,0,5000.0,17940.00,17940.00
16/01/2025,885,DEPOSITO COMPLETO,43257931,880050584,EFECTIVO,12500.80,0,5,439.2,5,439.2
Confidencial`;

    const result = parseFromString(csvContent);

    // Test header info
    expect(result.header.title).toBe("Movimientos de la Cuenta");
    expect(result.header.dateRange.from.getFullYear()).toBe(2025);
    expect(result.header.dateRange.from.getMonth()).toBe(0); // January
    expect(result.header.dateRange.from.getDate()).toBe(1);

    expect(result.header.account.accountNumber).toBe("3689");
    expect(result.header.account.accountType).toBe("Monetario");
    expect(result.header.account.accountAlias).toBe("CUENTA CORRIENTE 1");
    expect(result.header.account.currency).toBe("GTQ");

    // Test transactions
    expect(result.transactions.length).toBe(4);

    // Test first transaction
    const firstTransaction = result.transactions[0];
    expect(firstTransaction.date.getDate()).toBe(14);
    expect(firstTransaction.date.getMonth()).toBe(0); // January
    expect(firstTransaction.description).toBe(
      "DEPOSITO INICIAL CTA CORRIENTES"
    );
    expect(firstTransaction.amount).toBe(5000);
    expect(firstTransaction.accountingBalance).toBe(5000);

    // Test third transaction
    const thirdTransaction = result.transactions[2];
    expect(thirdTransaction.office).toBe("885");
    expect(thirdTransaction.description).toBe("DEPOSITO COMPLETO");
    expect(thirdTransaction.amount).toBe(5000);
    expect(thirdTransaction.availableBalance).toBe(17940);
  });

  it("should create a sample statement", () => {
    const statement = createSampleStatement();
    expect(statement.header.title).toBe("Movimientos de la Cuenta");
    expect(statement.transactions.length).toBe(5);
  });

  it("should export a statement to CSV", () => {
    const statement = createSampleStatement();
    const csv = exportToCsv(statement);

    expect(csv).toContain("Movimientos de la Cuenta");
    expect(csv).toContain("Fecha,Oficina,Descripción,Referencia,Secuencial");
    expect(csv).toContain("DEPOSITO INICIAL CTA CORRIENTES");
    expect(csv).toContain("Confidencial");
  });
});
