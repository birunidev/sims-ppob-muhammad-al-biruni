import { formatRupiah } from '@/utils'

import { TransactionCardProp } from '..'

const TransactionAmount = ({ type, amount }: Partial<TransactionCardProp>) => {
  if (!amount) return null
  return type == 'TOPUP' ? (
    <p className="text-lg font-bold text-success md:text-xl">
      + Rp {formatRupiah(amount.toString())}
    </p>
  ) : (
    <p className="text-lg font-bold text-primary md:text-xl">
      - Rp {formatRupiah(amount.toString())}
    </p>
  )
}

export default TransactionAmount
