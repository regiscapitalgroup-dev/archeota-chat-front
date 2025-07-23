import React from 'react'
import {TableColumn} from 'react-data-table-component'
import DataTableComponent from '../../../components/DataTableComponent'
import {KTSVG} from '../../../../_metronic/helpers'
import { useHistory } from 'react-router-dom'

export type User = {
  id: number
  name: string
  email: string
  phoneNumber?: string
  nationalId: string
  role: string
}

interface UsersGridProps {
  users: User[]
  onEdit: (id: number) => void
  onDetail: (id: number) => void
  loading: boolean
}

const roleLabels: Record<string, string> = {
  admin: 'Administrator',
  user: 'Class Member',
  corporation: 'Claims Admin',
}

const getColumns = (
  onEdit: (id: number) => void,
  onDetail: (id: number) => void
): TableColumn<User>[] => [
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Email',
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: 'Phone',
    selector: (row) => row.phoneNumber || '',
    sortable: true,
  },
  {
    name: 'Nationality ID',
    selector: (row) => row.nationalId,
    sortable: true,
  },
  {
    name: 'Role',
    selector: (row) => roleLabels[row.role] || row.role,
    sortable: true,
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div className='d-flex justify-content-start gap-2'>
        <a
          title='Detail'
          type='button'
          className='btn btn-icon  btn-active-color-dark btn-sm'
          onClick={() => onDetail(row.id)}
        >
          <KTSVG path='/media/icons/duotune/general/gen004.svg' className='svg-icon-3' />
        </a>
        <a
          title='Edit'
          className='btn btn-icon btn-active-color-dark btn-sm'
          onClick={() => onEdit(row.id)}
        >
          <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
        </a>
      </div>
    ),
  },
]

const UsersGrid: React.FC<UsersGridProps> = ({users, onEdit, onDetail, loading = false}) => {
  const history = useHistory();
  const handleCreateNew = () => {
    history.push('/users/new')
  }

  return (
    <div className='card shadow-sm mb-10'>
      <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder text-dark fs-3'>Users</span>
          <span className='text-muted mt-1 fs-7'>List of users</span>
        </h3>
        <div className='d-flex gap-2 ms-auto align-items-center position-relative'>
          <button className='btn btn-sm btn-dark' onClick={handleCreateNew}>
            <i className='bi bi-plus fs-5 me-2'></i>
            New User
          </button>
        </div>
      </div>

      <div className='card-body py-3'>
        <DataTableComponent<User>
          columns={getColumns(onEdit, onDetail)}
          data={users}
          loading={loading}
          pagination
          paginationServer={false}
          totalRows={users.length}
          customTitle={null}
          highlightOnHover
        />
      </div>
    </div>
  )
}

export default UsersGrid
