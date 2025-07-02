import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import TablePaginated from '../../../components/TablePaginated'

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
  onEdit?: (id: number) => void
  onDetail?: (id: number) => void
  loading?: boolean
}

const roleLabels: Record<string, string> = {
  admin: 'Administrator',
  user: 'Class Member',
  corporation: 'Claims Admin',
}

const UsersGrid: React.FC<UsersGridProps> = ({
  users,
  onEdit,
  onDetail,
  loading = false,
}) => {
  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'phoneNumber', header: 'Phone' },
      { accessorKey: 'nationalId', header: 'Nationality ID' },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: info => roleLabels[info.getValue() as string] || info.getValue(),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div style={{ display: 'flex', gap: 8 }}>
            {onDetail && (
              <button
                type="button"
                className="btn btn-sm btn-light-primary"
                onClick={() => onDetail(row.original.id)}
                title="Detail"
              >
                <i className="bi bi-eye"></i>
              </button>
            )}
            {onEdit && (
              <button
                type="button"
                className="btn btn-sm btn-light-warning"
                onClick={() => onEdit(row.original.id)}
                title="Edit"
              >
                <i className="bi bi-pencil"></i>
              </button>
            )}
          </div>
        ),
      },
    ],
    [onEdit, onDetail]
  )

  return (
    <TablePaginated
      columns={columns}
      data={users}
      loading={loading}
      pageSize={10} 
      message='Loading users...'
    />
  )
}

export default UsersGrid
