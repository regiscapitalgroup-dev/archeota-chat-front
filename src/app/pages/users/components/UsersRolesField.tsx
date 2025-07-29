import Select from 'react-select'
import {useField, useFormikContext} from 'formik'
import {UserRolesModel} from '../models/UserRolesModel'

export const RolesAutocompleteField = ({
  name = 'role',
  isEdit = false,
  roles = [] as UserRolesModel[],
  loading = false,
  errorRol = null as string | null | undefined,
}) => {
  const {setFieldValue, values} = useFormikContext<any>()
  const [field, meta] = useField(name)

  const options = roles?.map((rol) => ({
    value: rol.code,
    label: rol.code,
  }))

  const selectedOption = options?.find((opt) => opt.value === field.value) || null

  return (
    <div className='form-group mb-5'>
      <label className='required'>Role</label>
      <Select
        inputId={name}
        isLoading={loading}
        options={options}
        value={selectedOption}
        onChange={async (option: {value: string; label: string; attributes: any} | null) => {
          setFieldValue(name, option ? option.value : '')
        }}
        placeholder='Select or search role...'
        isClearable
        classNamePrefix='react-select'
      />
      {meta.touched && meta.error && <div className='text-danger'>{meta.error}</div>}
      {errorRol && <small className='form-text text-danger'>Error loading roles</small>}
    </div>
  )
}
