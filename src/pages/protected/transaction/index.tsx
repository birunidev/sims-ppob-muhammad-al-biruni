import { TransactionCards } from '@/components/molecules'
import { TransactionEmpty, TransactionFilter } from '@/components/organisms'
import DashboardTemplate from '@/components/templates/dashboard-template'
import useTransaction from '@/hooks/useTransaction'
import { getTransactionsByMonth } from '@/services/transaction.service'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Transaction() {
  const currentLimit = 5
  const [searchParams] = useSearchParams()
  const [currentOffset, setCurrentOffset] = useState(0)
  const [canLoadMore, setCanLoadMore] = useState(true)
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)
  const { transactions, transactionLoading, setTransactions } = useTransaction(
    currentOffset,
    currentLimit,
  )

  const transactionsData = transactions && transactions.records

  const filter_month = parseInt(searchParams.get('filter_month') || '0')

  const handleLoadMore = async () => {
    setLoadMoreLoading(true)
    const nextOffset: number = currentOffset + currentLimit
    setCurrentOffset(nextOffset)
    try {
      const response: any = await getTransactionsByMonth(
        nextOffset,
        currentLimit,
        filter_month,
      )
      if (transactions && response.records.length > 0)
        setTransactions({
          ...transactions,
          records: [...transactions.records, ...response.records],
          limit: response.limit,
          offset: response.offset,
        })
      else {
        setCanLoadMore(false)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoadMoreLoading(false)
    }
  }

  useEffect(() => {
    // filter transaction based on selected month

    if (filter_month > -1) {
      setCurrentOffset(0)
      setCanLoadMore(true)
      getTransactionsByMonth(0, currentLimit, filter_month).then((res) => {
        setTransactions(res)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter_month])

  return (
    <DashboardTemplate>
      <div className="custom-container space-y-3">
        <p className="text-base font-bold md:text-lg">Semua Transaksi</p>
        <TransactionFilter />
      </div>
      {(!transactionsData ||
        (transactionsData && transactionsData.length) === 0) && (
        <TransactionEmpty />
      )}
      <div className="custom-container space-y-6 pb-10">
        <TransactionCards
          transactionLoading={transactionLoading}
          transactions={transactionsData}
        />
        {transactionsData && transactionsData.length > 0 && canLoadMore && (
          <div className="text-center">
            <button
              disabled={loadMoreLoading}
              onClick={handleLoadMore}
              className="font-bold text-primary"
            >
              {loadMoreLoading ? (
                <span className="loading loading-spinner mx-auto text-primary"></span>
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}
      </div>
    </DashboardTemplate>
  )
}
