import Select, {SingleValue} from 'react-select'
import {useEffect, useState} from 'react'

interface UsersAutocompleteFieldProps {
  users?: {id: number; firstName: string; lastName: string}[]
  loading?: boolean
  errorRol?: string | null
  onUserSelected: (value: any | null) => void
  uploadSucces: number
}

type OptionType = {value: number; label: string}

export const UsersAutocompleteField = ({
  users = [],
  loading = false,
  errorRol = null,
  onUserSelected,
  uploadSucces,
}: UsersAutocompleteFieldProps) => {
  const options: OptionType[] = users?.map((u) => ({
    value: u.id,
    label: `${u.firstName} ${u.lastName}`,
  }))

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null)

  useEffect(() => {
    setSelectedOption(null)
  }, [uploadSucces])

  return (
    <div className='mb-5 py-5 '>
      <label className='mb-2'>Assigned user</label>
      <Select<OptionType, false>
        isLoading={loading}
        options={options}
        value={selectedOption}
        onChange={(option: SingleValue<OptionType>) => {
          setSelectedOption(option)
          onUserSelected(option)

        }}
        placeholder='Select or search user...'
        isClearable
        classNamePrefix='react-select'
      />
      {errorRol && <small className='form-text text-danger'>{errorRol}</small>}
    </div>
  )
}
