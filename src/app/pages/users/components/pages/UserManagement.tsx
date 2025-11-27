import React, { useEffect, useMemo, useRef, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { KTSVG } from '../../../../../_metronic/helpers'
import { RootState } from '../../../../../setup'
import { FilterProp } from '../../../../components/molecules/models/FilterProp.Model'
import { UserRoles } from '../../../../enums/userRoles'
import { filterData } from '../../../../services/utilsService'
import { UserListModel } from '../../models/UserListModel'
import UserList from '../organisms/UserList'
import UserToolbar from '../templates/UserToolbar'
import UserToolbarSuperAdmin from '../templates/UserToolbarSuperAdmin'


const FilterProps: FilterProp[] = [
  {
    key: 'firstName',
    label: 'First name',
    type: 'text'
  },
  {
    key: 'lastName',
    label: 'Last name',
    type: 'text'
  },
  {
    key: 'email',
    label: 'Email',
    type: 'text'
  },
  {
    key: 'role',
    label: 'Role',
    type: []
  },
  {
    key: 'classification',
    label: 'Classification',
    type: []
  },
  {
    key: 'company',
    label: 'Company',
    type: []
  }
];


interface UserManagementProps {
  users: UserListModel[];
  onEdit: (id: number) => void;
  onDetail: (id: number) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
  loading: boolean;
  reloadUsers: () => void;
}


const UserManagement: React.FC<UserManagementProps> = ({users, onEdit, onDetail, onDelete, onCreate, loading = false, reloadUsers}) => {
  const {user} = useSelector((root: RootState) => root.auth, shallowEqual);
  const isMountedRef = useRef(false);
  const [filters, setFilters] = useState({firstName: '', lastName: '', email: '', role: [], classifier: []})
  const filteredUsers = useMemo(() => filterData(users, filters), [users, filters])
  const [filterProps, setFilterProps] = useState(FilterProps);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    }
  }, []);

  useEffect(() => {
    setFilterProps([
      {
        key: 'firstName',
        label: 'First name',
        type: 'text'
      },
      {
        key: 'lastName',
        label: 'Last name',
        type: 'text'
      },
      {
        key: 'email',
        label: 'Email',
        type: 'text'
      },
      {
        key: 'role',
        label: 'Role',
        type: Array.from(new Map(users.map(user => [user.role, user])).values()).map(u => u.role)
      },
      {
        key: 'classification',
        label: 'Classification',
        type: (Array.from(new Map(users.map(u => [u.classification, u])).values()).map(u => u.classification).filter(u => !!u) as string[])
      },
      {
        key: 'company',
        label: 'Company',
        type: Array.from(new Map(users.map(user => [user.company, user])).values()).map(u => u.company).filter(u => !!u) as string[]
      }
    ])    
  }, [users])

  const handleResetFilter = () => setFilters({firstName: '', lastName: '', email: '', role: [], classifier: []});

  return (
    <div className='card shadow-sm mb-10'>
      <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder text-dark fs-3'>Users</span>
          <span className='text-muted mt-1 fs-7'>List of users</span>
        </h3>
        <div className='d-flex gap-2 ms-auto align-items-center position-relative'>
          { users.length > 0 && user && (
              user.role === UserRoles.SUPER_ADMIN ? (
                <UserToolbarSuperAdmin
                  props={filterProps}
                  filters={filters}
                  onResetFilters={handleResetFilter}
                  setFilters={setFilters} 
                  reloadUserList={reloadUsers}
                />
              ) : (
                <UserToolbar
                  props={filterProps}
                  filters={filters}
                  onResetFilters={handleResetFilter}
                  setFilters={setFilters} 
                />  
              )
          )}
          <button className='btn btn-sm btn-dark' onClick={onCreate}>
            <KTSVG
              path="/media/icons/duotune/general/gen041.svg" 
              className="svg-icon-5 svg-icon-gray-500 ms-1" 
            />
            New User
          </button>
        </div>
      </div>

      <div className='card-body py-3'>
        <UserList 
          data={filteredUsers}
          loading={loading}
          onDelete={onDelete}
          onDetail={onDetail}
          onEdit={onEdit}
          showCompany={!!user && !!user.role && user?.role === UserRoles.SUPER_ADMIN}
        />
      </div>
    </div>
  )
}

export default UserManagement
