import Select from 'react-select';
import { UserListModel } from '../../../users/models/UserListModel';

type OptionType = {value: number; label: string}

type Props = {
  isLoading: boolean;
  users: UserListModel[];
  userSelected: UserListModel | null;
  onChange: (value: { value: UserListModel, label: string } | null) => void;
  className?: string;
  disabled?: boolean;
}

export const UsersField = ({ isLoading, users, userSelected, onChange, className, disabled }: Props) => {
  return (
    <div className={className}>
      <label className='mb-2'>Assigned user</label>
      <Select<OptionType, false>
        isClearable
        isDisabled={disabled ?? false}
        isLoading={isLoading}
        options={users.map(u => ({ value: u, label: `${u.firstName} ${u.lastName}` }))}
        value={userSelected ? { value: userSelected, label: `${userSelected.firstName} ${userSelected.lastName}` } : null}
        onChange={onChange}
        placeholder='Select or search user...'
        classNamePrefix='react-select'
      />
    </div>
  )
}
