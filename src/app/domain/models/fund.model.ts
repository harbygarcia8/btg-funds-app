export type FundCategory = 'FPV' | 'FIC';

export interface Fund {
  id: string;
  name: string;
  minAmount: number;
  category: FundCategory;
}

export interface UserBalance {
  currentBalance: number;
}

export type NotificationType = 'email' | 'sms';
export type TransactionType = 'subscription' | 'cancelation';

export interface Transaction {
  id: string;
  fundId: string;
  fundName: string;
  amount: number;
  type: TransactionType;
  date: Date;
}
