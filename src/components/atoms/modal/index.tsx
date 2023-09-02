const sizeMapper = {
  sm: 'max-w-sm md:max-w-sm',
  md: 'max-w-sm md:max-w-md',
  lg: 'max-w-sm md:max-w-lg',
  xl: 'max-w-sm md:max-w-xl',
  '2xl': 'max-w-sm md:max-w-2xl',
}

interface ModalProp {
  children: React.ReactNode | React.ReactNode[]
  showModal: boolean
  wrapperCss?: string
  closeModal: () => void
  size?: keyof typeof sizeMapper
  backdropMode?: 'static' | 'close'
}

export default function Modal({
  children,
  showModal,
  wrapperCss = '',
  closeModal,
  size = 'sm',
  backdropMode = 'static',
}: ModalProp) {
  return (
    <>
      <div
        onClick={backdropMode !== 'static' ? closeModal : () => {}}
        className={`fixed inset-0 z-[-9] bg-black/20 ${
          showModal ? 'z-[999] opacity-100' : 'z-[-9] opacity-0'
        } transition-all`}
      ></div>
      <div
        className={`fixed left-1/2 top-1/2 w-full ${
          sizeMapper[size]
        } -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-3 py-6 transition-all ${
          showModal
            ? 'z-[1000] scale-100 opacity-100'
            : 'z-[-999] scale-0 opacity-0'
        } ${wrapperCss}`}
      >
        {children}
      </div>
    </>
  )
}
