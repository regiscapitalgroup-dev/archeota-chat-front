import React, { useState }  from 'react'
import {useHistory, useLocation, useParams} from 'react-router-dom'
import {RouteParamsModel} from '../shared/models/RouteParamsModel'
import UserForm from './components/UserForm'
import UsersGrid from './components/UserGrid'
import {useUserById} from '../../hooks/users/useUserById'
import {useUsers} from '../../hooks/users/useUsers'

const UsersPage: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const isEditMode = location.pathname.includes('/users/edit')
  const isNewMode = location.pathname.includes('/users/new')
  const {id: routeId} = useParams<RouteParamsModel>()
  const userId = routeId ? Number(routeId) : undefined;
  const [realod, setRealod] = useState<number>(Math.random() *20);
  const {
    user: selectedUser,
    loading: loadingUserData,
    error: userError,
  } = useUserById(isEditMode && userId ? userId : 0)

  const {users, loading: loadingAllUsers, error: ErrorList} = useUsers(realod)


  const handleEdit = (userId: number) => {
    history.push(`/users/edit/${userId}`)
  }

  const handleSuccess = () => {
    history.push('/users')
    setRealod(Math.random() * 50)
  }

  const handleDetail = (userId: number) => {
    history.push(`/users/detail/${userId}`)
  }

  

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
            users={users ?? []}
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
