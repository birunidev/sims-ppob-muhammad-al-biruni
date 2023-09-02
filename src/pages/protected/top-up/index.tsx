import { FormInput, AmountRadio } from '@/components/atoms'
import { ConfirmModal, StateModal } from '@/components/molecules'
import DashboardTemplate from '@/components/templates/dashboard-template'
import { Global } from '@/constants'
import useDisclosure from '@/hooks/useDisclosure'
import { topUpBalance } from '@/services/transaction.service'
import { TopUpResponse } from '@/types/transaction'
import { decodeRupiah, formatRupiah } from '@/utils/number'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { BiWallet } from 'react-icons/bi'

const topUpAmounts = ['10000', '20000', '50000', '100000', '25000', '500000']

export default function TopUp() {
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
      top_up_amount: '',
    },
    onSubmit: () => {
      onOpenConfirmModal()
    },
  })

  useEffect(() => {
    formik.setFieldValue(
      'top_up_amount',
      formatRupiah(formik.values.top_up_amount),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.top_up_amount])

  const handleConfirm = async () => {
    onCloseConfirmModal()
    onOpenStateModal()

    try {
      const response: TopUpResponse = await topUpBalance({
        top_up_amount: decodeRupiah(formik.values.top_up_amount),
      })
      console.log(response)
      setStatus('success')
    } catch (error: any) {
      setStatus('error')
      console.log(error)
    } finally {
      formik.setSubmitting(false)
    }
  }

  const checkTopUpAmount = () => {
    return (
      formik.isSubmitting ||
      formik.values.top_up_amount == '' ||
      decodeRupiah(formik.values.top_up_amount) < Global.MINIMUM_TOPUP ||
      decodeRupiah(formik.values.top_up_amount) > Global.MAXIMUM_TOPUP
    )
  }

  return (
    <DashboardTemplate>
      <div className="custom-container space-y-3">
        <div>
          <p>Silahkan masukkan</p>
          <h1 className="text-2xl font-semibold">Nominal Top Up</h1>
        </div>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-2 space-y-3 md:grid md:grid-cols-[1fr_500px] md:gap-x-12 md:space-y-0"
          >
            <div className="space-y-3">
              <FormInput
                icon={
                  <BiWallet className="absolute left-[10px] top-[50%] h-4 w-4 translate-y-[-50%]" />
                }
                name="top_up_amount"
                placeholder="Masukkan nominal top up"
                id="top_up_amount"
                type="text"
                value={formik.values.top_up_amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
                touched={formik.touched.top_up_amount}
                error={formik.errors.top_up_amount}
              />
              <div className="hidden md:block">
                <button
                  type="submit"
                  disabled={checkTopUpAmount()}
                  className="btn btn-primary w-full capitalize text-white"
                >
                  Top Up
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {topUpAmounts.map((amount, index) => {
                return (
                  <AmountRadio
                    key={index}
                    value={amount}
                    label={amount}
                    name={'top_up_amount'}
                    id={`top_up_amount-${index}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                )
              })}
            </div>
            <div className="block md:hidden">
              <button
                disabled={checkTopUpAmount()}
                className="btn btn-primary w-full capitalize text-white"
              >
                Top Up
              </button>
            </div>
          </form>
        </div>
      </div>
      {createPortal(
        <ConfirmModal
          confirmText="Anda yakin untuk Top Up  Listrik sebesar"
          amount={formik.values.top_up_amount}
          confirmBtnText="Ya, Lanjutkan Top Up"
          showModal={confirmModal}
          handleConfirm={handleConfirm}
          handleCloseModal={onCloseConfirmModal}
        />,
        document.body,
      )}
      {createPortal(
        <StateModal
          title="Top Up sebesar"
          amount={formik.values.top_up_amount}
          showModal={stateModal}
          status={status}
          handleCloseModal={onCloseStateModal}
        />,
        document.body,
      )}
    </DashboardTemplate>
  )
}
