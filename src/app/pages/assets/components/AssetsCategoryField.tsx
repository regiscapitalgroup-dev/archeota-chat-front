import Select from 'react-select'
import {useField, useFormikContext} from 'formik'
import Swal from 'sweetalert2'
import { AssetsCategoriesModel } from '../models/AssetsCategories'

export const CategoryAutocompleteField = ({
  name = 'category',
  attrField = 'attributes',
  isEdit = false,
  categories = [] as AssetsCategoriesModel[],
  loading = false,
  errorCat = null as string | null | undefined,
}) => {
  
  const {setFieldValue, values} = useFormikContext<any>()
  const [field, meta] = useField(name)

  const options = categories.map((cat) => ({
    value: cat.id,
    label: cat.categoryName,
    attributes: cat.attributes || {},
  }))

  const selectedOption = options.find((opt) => opt.value === field.value) || null

  const hasAttributeValues = Object.values(values[attrField] || {}).some(
    (val) => val !== '' && val !== null && val !== undefined
  )

  return (
    <div className='form-group mb-5'>
      <label className='required'>Category</label>
      <Select
        inputId={name}
        isLoading={loading}
        options={options}
        value={selectedOption}
        onChange={async (option: {value: string; label: string; attributes: any} | null) => {
          if (
            isEdit &&
            hasAttributeValues &&
            option &&
            String(option.value) !== String(field.value)
          ) {
            const result = await Swal.fire({
              title: 'Change category?',
              text: "If you change categories, you'll lose the captured attribute values. Are you sure?",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, change',
              cancelButtonText: 'No, cancel',
              customClass: {
                confirmButton: 'btn-dark',
              },
            })
            if (!result.isConfirmed) {
              return
            }
          }
          setFieldValue(name, option ? option.value : '')
          setFieldValue(attrField, option ? option.attributes : {})
        }}        
        placeholder='Select or search category...'
        isClearable
        classNamePrefix='react-select'
      />
      {meta.touched && meta.error && <div className='text-danger'>{meta.error}</div>}
      {errorCat && <small className='form-text text-danger'>Error loading categories</small>}
    </div>
  )
}
