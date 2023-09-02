import { useSearchParams } from 'react-router-dom'

const months = [
  'Semua',
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

export default function TransactionFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filter_month: number = parseInt(searchParams.get('filter_month'))
  return (
    <div className="gap-12 overflow-x-scroll whitespace-nowrap pb-3">
      {months.map((month, index) => {
        return (
          <button
            onClick={() => setSearchParams({ filter_month: index.toString() })}
            key={index}
            className={`mr-8 inline-block font-bold ${
              filter_month && filter_month == index
                ? 'text-primary'
                : !filter_month && index == 0
                ? 'text-primary'
                : 'text-gray-400'
            }`}
          >
            {month}
          </button>
        )
      })}
    </div>
  )
}
