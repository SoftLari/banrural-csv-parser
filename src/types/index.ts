export interface BanruralAccountInfo {
  accountNumber: string; // Last 4 digits of the account
  accountType: string; // Monetario, Ahorro, etc.
  accountAlias: string; // User alias in Banrural
  currency: string; // GTQ, USD, etc.
}

export interface BanruralStatementHeader {
  title: string;
  dateRange: {
    from: Date;
    to: Date;
  };
  account: BanruralAccountInfo;
}

export interface BanruralTransaction {
  date: Date;
  office: string;
  description: string;
  reference: string;
  sequence: string;
  paymentMethod: string;
  amount: number; // Positive for credit, negative for debit
  accountingBalance: number;
  availableBalance: number;
}

export interface BanruralStatement {
  header: BanruralStatementHeader;
  transactions: BanruralTransaction[];
}
