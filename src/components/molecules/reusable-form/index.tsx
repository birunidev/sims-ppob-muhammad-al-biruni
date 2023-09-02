import { FormInput } from '@/components/atoms'
import { FormikValues, useFormik } from 'formik'
import { convertArrToObject } from '@/utils'
import * as Yup from 'yup'

interface FieldProp {
  type: string
  name: string
  placeholder: string
  id: string
  label?: string
  icon?: any
  validation?: any
  initialValue: string
  disabled: boolean
}

interface ReusableFormProps {
  fields: FieldProp[]
  btnLabel: string
  formCss?: string
  handleSubmit?: (values: FormikValues) => Promise<any>
  isDisabled?: boolean
}

export default function ReusableForm({
  fields,
  btnLabel = 'Untitled Button',
  formCss = '',
  isDisabled = false,
  handleSubmit = async () => {},
}: ReusableFormProps) {
  const formik = useFormik({
    initialValues: {
      ...convertArrToObject(fields, 'name', 'initialValue'),
    },
    onSubmit: async (values, action) => {
      action.setSubmitting(true)
      await handleSubmit(values)
      action.setSubmitting(false)
    },
    validationSchema: Yup.object({
      ...convertArrToObject(fields, 'name', 'validation'),
    }),
  })

  return (
    <form onSubmit={formik.handleSubmit} className={`space-y-3 ${formCss}`}>
      {fields.map((field: FieldProp) => {
        return (
          <FormInput
            type={field.type}
            touched={formik.touched[field.name]}
            error={formik.errors[field.name]}
            value={formik.values[field.name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isDisabled || formik.isSubmitting || field.disabled}
            placeholder={field.placeholder}
            icon={field.icon}
            name={field.name}
            id={field.id}
            key={field.id}
          />
        )
      })}
      {isDisabled == false && (
        <div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="btn btn-primary btn-md w-full capitalize text-white"
          >
            {formik.isSubmitting ? 'Processing...' : btnLabel}
          </button>
        </div>
      )}
    </form>
  )
}
