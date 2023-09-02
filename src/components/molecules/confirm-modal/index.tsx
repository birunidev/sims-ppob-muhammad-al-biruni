import Modal from '@/components/atoms/modal'
import { formatRupiah } from '@/utils/number'

export default function ConfirmModal({
  showModal,
  handleConfirm,
  handleCloseModal,
  confirmText,
  amount,
  confirmBtnText,
}: {
  showModal: boolean
  handleConfirm: () => void
  handleCloseModal: () => void
  confirmText: string
  amount: string
  confirmBtnText: string
}) {
  return (
    <Modal closeModal={handleCloseModal} showModal={showModal}>
      <div className="space-y-6">
        <div className="text-center">
          <img src="/assets/logo.svg" className="mx-auto" />
        </div>
        <div className="space-y-2 text-center">
          <p>{confirmText}</p>
          <p className="text-xl font-bold">Rp{formatRupiah(amount)} ?</p>
        </div>
        <div className="text-cente3 flex flex-col space-y-2">
          <button
            onClick={handleConfirm}
            className="font-semibold text-primary"
          >
            {confirmBtnText}
          </button>
          <button onClick={handleCloseModal} className="text-gray-400">
            Batalkan
          </button>
        </div>
      </div>
    </Modal>
  )
}
