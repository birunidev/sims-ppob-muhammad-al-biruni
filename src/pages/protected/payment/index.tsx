import { FormInput } from '@/components/atoms'
import { StateModal } from '@/components/molecules'
import ConfirmModal from '@/components/molecules/confirm-modal'
import DashboardTemplate from '@/components/templates/dashboard-template'
import useDisclosure from '@/hooks/useDisclosure'
import { getServiceByCode } from '@/services/information.service'
import { doPayment } from '@/services/transaction.service'
import { ServiceItem } from '@/types/information'
import { formatRupiah } from '@/utils/number'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import toast from 'react-hot-toast'
import { BiWallet } from 'react-icons/bi'
import { useParams } from 'react-router-dom'

export default function Payment() {
  const params = useParams()
  const { service_code } = params
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null,
  )
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  )

  const {
    isOpen: confirmModal,
    onOpen: onOpenConfirmModal,
    onClose: onCloseConfirmModal,
  } = useDisclosure()

  const {
    isOpen: stateModal,
    onOpen: onOpenStateModal,
    onClose: onCloseStateModal,
  } = useDisclosure()

  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    onSubmit: () => {
      onOpenConfirmModal()
    },
  })

  const handleCloseConfirm = () => {
    onCloseConfirmModal()
    formik.setSubmitting(false)
  }

  const handleConfirm = async () => {
    onCloseConfirmModal()
    onOpenStateModal()

    if (!service_code) return toast.error('Service code must be provided')

    try {
      const response: any = await doPayment({ service_code: service_code })
      console.log(response)
      setStatus('success')
    } catch (error) {
      setStatus('error')
      console.log(error)
    } finally {
      formik.setSubmitting(false)
    }
  }

  useEffect(() => {
    formik.setFieldValue('amount', formatRupiah(formik.values.amount))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.amount])

  useEffect(() => {
    getServiceByCode(service_code).then((res) => {
      setSelectedService(res)
      formik.setFieldValue(
        'amount',
        formatRupiah(res.service_tariff.toString()),
      )
    })
  }, [service_code, formik])

  const validateForm = () => {
    return formik.isSubmitting || formik.values.amount == ''
  }

  return (
    <DashboardTemplate>
      <div className="custom-container space-y-3">
        <div className="space-y-3">
          <p>Pembayaran</p>
          <div className="flex items-center gap-2">
            <img
              src={selectedService?.service_icon}
              className="w-full max-w-[50px] md:max-w-[70px]"
              alt="PLN"
            />
            <h1 className="text-xl font-semibold md:text-2xl">
              {selectedService?.service_name}
            </h1>
          </div>
        </div>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-2 space-y-3 md:grid  md:gap-x-12 md:space-y-0"
          >
            <div className="space-y-3">
              <FormInput
                icon={
                  <BiWallet className="absolute left-[10px] top-[50%] h-4 w-4 translate-y-[-50%]" />
                }
                name="amount"
                placeholder="Masukkan nominal"
                id="amount"
                type="text"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={true}
                touched={formik.touched.amount}
                error={formik.errors.amount}
              />
              <div className="">
                <button
                  disabled={validateForm()}
                  className="btn btn-primary w-full capitalize text-white"
                >
                  Bayar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {createPortal(
        <ConfirmModal
          confirmText={`Beli ${selectedService?.service_name} senilai`}
          amount={formik.values.amount}
          confirmBtnText="Ya, Lanjutkan Bayar"
          showModal={confirmModal}
          handleConfirm={handleConfirm}
          handleCloseModal={handleCloseConfirm}
        />,
        document.body,
      )}
      {createPortal(
        <StateModal
          title={`Pembayaran ${selectedService?.service_name} sebesar`}
          amount={formik.values.amount}
          showModal={stateModal}
          status={status}
          handleCloseModal={onCloseStateModal}
        />,
        document.body,
      )}
    </DashboardTemplate>
  )
}
