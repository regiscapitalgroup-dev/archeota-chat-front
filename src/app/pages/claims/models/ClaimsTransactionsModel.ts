export interface ClaimTransactionModel {
  id: number
  dataFor: string;
  tradeDate: string;
  account: string;
  accountName: string;
  accountType: string;
  accountNumber: string;
  activity: string;
  description: string;
  symbol: string;
  quantity: number;
  amount: string;
  notes: string;
  type: string;
  company: string;
  user: string;
  costPerStock: string;
}
