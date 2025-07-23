import React from 'react'
import {useHistory, useLocation, useParams} from 'react-router-dom'
import {RouteParamsModel} from '../shared/models/RouteParamsModel'
import UserForm from './components/UserForm'
import UsersGrid, {User} from './components/UserGrid'
import {useUserById} from '../../hooks/users/useUserById'
import {useUsers} from '../../hooks/users/useUsers'

const UsersPage: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const isEditMode = location.pathname.includes('/users/edit')
  const isNewMode = location.pathname.includes('/users/new')
  const {id: routeId} = useParams<RouteParamsModel>()
  const userId = routeId ? Number(routeId) : undefined
  const {
    user: selectedUser,
    loading: loadingUserData,
    error: userError,
  } = useUserById(isEditMode && userId ? userId : 0)

  const {users, loading: loadingAllUsers, error: ErrorList} = useUsers()

  const handleEdit = (userId: number) => {
    history.push(`/users/edit/${userId}`)
  }

  const handleSuccess = () => {
    history.push('/users')
  }

  const handleDetail = (userId: number) => {
    history.push(`/users/detail/${userId}`)
  }

  const _users: User[] = [
    {
      id: 1,
      name: 'Alice Smith',
      email: 'alice.smith@email.com',
      phoneNumber: '555-1234',
      nationalId: 'A12345678',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Bob Johnson',
      email: 'bob.johnson@email.com',
      phoneNumber: '555-5678',
      nationalId: 'B87654321',
      role: 'user',
    },
    {
      id: 3,
      name: 'Carol Martinez',
      email: 'carol.martinez@email.com',
      phoneNumber: '555-9012',
      nationalId: 'C98765432',
      role: 'corporation',
    },
    {
      id: 4,
      name: 'David Lee',
      email: 'david.lee@email.com',
      phoneNumber: '555-3456',
      nationalId: 'D13579246',
      role: 'user',
    },
    {
      id: 5,
      name: 'Eva González',
      email: 'eva.gonzalez@email.com',
      phoneNumber: '555-7890',
      nationalId: 'E24681357',
      role: 'admin',
    },
  ]

  return (
    <div className='card mb-10'>
      <div className='card-body'>
        {isEditMode || isNewMode ? (
          <>
            <UserForm
              isEdit={isEditMode}
              initialData={selectedUser || undefined}
              onSuccess={handleSuccess}
              loadingInfo={loadingUserData}
            />
          </>
        ) : (
          <UsersGrid
            users={_users ?? []}
            onEdit={handleEdit}
            onDetail={handleDetail}
            loading={loadingAllUsers}
          />
        )}
      </div>
    </div>
  )
}

export {UsersPage}
