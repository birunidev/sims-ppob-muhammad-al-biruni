import { formatRupiah } from '@/utils'
import { ChangeEvent } from 'react'

interface AmountRadioProp {
  id: string
  name: string
  value: string
  onChange: (e: ChangeEvent<any>) => void
  onBlur: (e: ChangeEvent<any>) => void
  label: string
}

export default function AmountRadio({
  id,
  name,
  value,
  onChange,
  onBlur,
  label,
}: AmountRadioProp) {
  return (
    <label htmlFor={id} className="amount-radio text-center">
      <input
        type="radio"
        id={id}
        name={name}
        className="radio-primary radio"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span className="block rounded-lg border border-gray-200 px-4 py-3">
        Rp {formatRupiah(label)}
      </span>
    </label>
  )
}
