import { RouteName } from '@/constants'
import { Link } from 'react-router-dom'

export interface ServiceProp {
  service_code: string
  service_name: string
  service_icon: string
  service_tariff: number
}

export const serviceAlias: any = {
  PAJAK: 'PBB',
  PLN: 'Listrik',
  PDAM: 'PDAM',
  PULSA: 'Pulsa',
  PGN: 'PGN',
  TV: 'TV Langganan',
  MUSIK: 'Musik',
  VOUCHER_GAME: 'Voucher Game',
  VOUCHER_MAKANAN: 'Voucher Makanan',
  QURBAN: 'Kurban',
  ZAKAT: 'Zakat',
  PAKET_DATA: 'Paket Data',
}

export default function ServiceCard(props: ServiceProp) {
  const { service_code, service_icon } = props

  return (
    <Link
      to={{
        pathname: RouteName.PAYMENT(service_code),
      }}
      className="service-card w-[70px] space-y-3 text-center"
    >
      <div>
        <img src={service_icon} className="w-full" />
      </div>
      <p className="text-center text-xs md:text-sm">
        {serviceAlias[service_code]}
      </p>
    </Link>
  )
}
