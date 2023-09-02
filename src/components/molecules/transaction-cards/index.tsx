import { Loader, TransactionCard } from '@/components/atoms'
import { TransactionHistoryItem } from '@/types/transaction'

export default function TransactionCards({
  transactions,
  transactionLoading,
}: {
  transactions?: TransactionHistoryItem[] | null
  transactionLoading: boolean
}) {
  if (transactionLoading) return <Loader />
  return (
    <div className="transaction-cards space-y-3">
      {transactions &&
        transactions.map((transaction: TransactionHistoryItem) => {
          return (
            <TransactionCard
              key={transaction.invoice_number}
              type={transaction.transaction_type}
              amount={transaction.total_amount}
              createdOn={transaction.created_on}
              description={transaction.description}
            />
          )
        })}
    </div>
  )
}
