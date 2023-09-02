import { ChangeEvent, useState } from 'react'
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2'

interface FormInputProps {
  icon: any
  label?: string
  onChange: (e: ChangeEvent<any>) => void
  value: string
  error: any
  touched: any
  name: string
  onBlur: (e: ChangeEvent<any>) => void
  placeholder: string
  disabled: boolean
  type?: string
  id: string
  inputCss?: string
}

export default function FormInput({
  icon,
  label,
  name,
  value,
  error,
  touched,
  id,
  placeholder,
  disabled,
  type = 'text',
  inputCss,
  onChange,
  onBlur,
}: FormInputProps) {
  const [inputType, setInputType] = useState(type)

  return (
    <div className="relative space-y-2 text-left">
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      <div className="relative">
        <span className={`icon-wrapper ${error && touched && 'is-error'}`}>
          {icon}
        </span>
        <input
          type={inputType}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          className={`input input-bordered input-md  w-full pl-8 ${inputCss} ${
            error && touched && 'border-primary focus:ring-primary'
          }`}
        />
        {type === 'password' && (
          <button
            onClick={() =>
              setInputType((prev) => (prev == 'password' ? 'text' : 'password'))
            }
            type="button"
            className="absolute right-[20px] top-1/2 -translate-y-1/2"
          >
            {inputType === 'password' ? (
              <HiOutlineEye className="h-4 w-4" />
            ) : (
              <HiOutlineEyeSlash className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {error && touched && (
        <span className="block text-right text-xs text-primary">{error}</span>
      )}
    </div>
  )
}
