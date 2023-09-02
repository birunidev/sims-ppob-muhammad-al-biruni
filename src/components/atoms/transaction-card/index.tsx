import TransactionAmount from './transaction-amount'
import { formatDate } from '@/utils'

export interface TransactionCardProp {
  amount: number
  type: string
  createdOn: string
  description: string
}

export default function TransactionCard({
  amount,
  type,
  createdOn,
  description,
}: TransactionCardProp) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-100 px-6 py-3">
      <div className="space-y-2">
        <TransactionAmount type={type} amount={amount} />
        <small className="text-gray-300">{formatDate(createdOn)}</small>
      </div>
      <div>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  )
}
