import { ApiResponse } from './response'

export interface BalanceBody {
  balance: number
}

export interface TopupBody {
  top_up_amount: number
}

export interface TransactionBody {
  service_code: string
}

export interface TransactionHistoryItem {
  invoice_number: string
  transaction_type: string
  description: string
  total_amount: number
  created_on: string
}

export interface TransactionHistoryData {
  offset: string
  limit: string
  records: TransactionHistoryItem[]
}

export interface TransactionHistoryResponse extends ApiResponse {
  data: TransactionHistoryData
}

export interface TopUpResponse extends ApiResponse {
  data: {
    balance: number
  }
}
export interface ErrorResponse extends ApiResponse {
  data: null
}
