import { useEffect, useState } from 'react'
import useFetch from './useFetch'
import { getTransactions } from '@/services/transaction.service'
import { TransactionHistoryData } from '@/types/transaction'

export default function useTransaction(offset?: number, limit?: number) {
  const { data, loading: transactionLoading } = useFetch(() =>
    getTransactions(offset, limit),
  )

  const [transactions, setTransactions] =
    useState<TransactionHistoryData | null>(data)

  useEffect(() => {
    if (data) setTransactions(data)
  }, [data])

  return { transactions, transactionLoading, setTransactions }
}
