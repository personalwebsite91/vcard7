
export enum TransactionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  USED = 'USED',
  REFUNDED = 'REFUNDED'
}

export interface CardTransaction {
  id: string;
  platform: string;
  amountUsd: number;
  amountInr: number;
  timestamp: number;
  status: TransactionStatus;
  cardNumber: string;
  expiry: string;
  cvv: string;
  color?: string;
  network: string; // 'visa' | 'mastercard'
  bank: string;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  defaultPrice: number;
}

export interface CardNetwork {
  id: string;
  name: string;
  icon: string;
}

export interface IssuingBank {
  id: string;
  name: string;
  icon: string;
}
