import Modal from '@/components/atoms/modal'
import { formatRupiah } from '@/utils/number'
import { HiCheckCircle, HiXCircle } from 'react-icons/hi2'

const iconMapper = {
  success: <HiCheckCircle className="mx-auto h-20 w-20 fill-success" />,
  error: <HiXCircle className="mx-auto h-20 w-20 fill-error" />,
  loading: null,
}

interface StateModalProp {
  showModal: boolean
  handleCloseModal: () => void
  title: string
  amount: string
  status: keyof typeof iconMapper
}

export default function StateModal({
  showModal,
  handleCloseModal,
  title,
  amount,
  status,
}: StateModalProp) {
  return (
    <Modal closeModal={handleCloseModal} showModal={showModal}>
      {status === 'loading' ? (
        <div className="space-y-6 py-12 text-center">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">{iconMapper[status]}</div>
          <div className="space-y-2 text-center">
            <p>{title}</p>
            <p className="text-xl font-bold">Rp{formatRupiah(amount)}</p>
            <p>{status === 'success' ? 'Berhasil!' : 'Gagal!'} </p>
          </div>
          <div className="text-cente3 flex flex-col space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="font-semibold text-primary"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
