import api from '@/config/api'
import {
  TopupBody,
  TransactionBody,
  TransactionHistoryItem,
} from '@/types/transaction'
import { getRealMonth } from '@/utils'

export const getBalance = async () => {
  return await api.get('/balance')
}

export const topUpBalance = async (data: TopupBody) => {
  return await api.post('/topup', data)
}

export const doPayment = async (data: TransactionBody) => {
  return await api.post('/transaction', data)
}

export const getTransactions = async (
  offset: number = 0,
  limit: number = 10,
) => {
  return await api.get('/transaction/history', { params: { offset, limit } })
}

export const getTransactionsByMonth = async (
  offset: number = 0,
  limit: number = 10,
  month: number,
) => {
  const response = await api.get('/transaction/history', {
    params: { offset, limit },
  })
  const transactions = response.data

  if (month === 0) return transactions

  const copyTransactionRecords = [...transactions.records]
  const transactionsData = copyTransactionRecords.filter(
    (transaction: TransactionHistoryItem) => {
      const transactionMonth = getRealMonth(transaction.created_on)
      return transactionMonth === month ? transaction : false
    },
  )
  console.log(transactionsData)
  return {
    ...transactions,
    records: transactionsData,
  }
}
