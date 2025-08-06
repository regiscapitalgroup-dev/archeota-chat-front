import UploadClaimsTransactionsFile from './components/UploadClaimsTransactionsFile'
import {useLocation} from 'react-router-dom'
import {useActionsClaim} from '../../hooks/claims/useClaimActions'
import {useTransactionsClaim} from '../../hooks/claims/useClaimTransactions'
import {useState} from 'react'
import ClaimsActionsGrid from './components/ClaimsActionsGrid'
import ClaimTransactionsTable from './components/ClaimsTransactionsGrid'
import {UsersAutocompleteField} from './components/UsersField'
import {useUsers} from '../../hooks/users/useUsers'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {canAccessModule} from '../../helpers/permissions'
import {Modules} from '../../constants/modules'

const ClaimsPage = () => {
  const location = useLocation()
  const isUpload = location.pathname.includes('/claims/upload-transactions')
  const isGridActions = location.pathname.includes('claims/actions')
  const isGridTransacctions = location.pathname.includes('claims/transactions')
  const [reloadUser] = useState<number>(Math.random() * 50)
  const [reload, setReload] = useState<number>(Math.random() * 50)
  const {actions, loading: loadingAct} = useActionsClaim()
  const {
    transactions,
    loading: loadingTrans,
    page,
    setPage,
    count,
  } = useTransactionsClaim(1, reload)
  const {users, loading: loadingAllUsers, error: ErrorList} = useUsers(reloadUser)
  const [user, setUser] = useState<any | null>()
  const userSession = useSelector((state: RootState) => state.auth.user, shallowEqual)

  const reloadTransactions = (newValue: number) => {
    setReload(newValue * 100)
    setUser(null)
  }

  const selectUserAsignement = (user: any | null) => {
    setUser(user)
  }

  const textAlert = user
    ? 'Transactions to be uploaded will be assigned'
    : 'Transactions have not been assigned'

  return (
    <div className='card mb-10'>
      <div className='card-body'>
        {isUpload && (
          <>
            <div className='card shadow-sm mb-10'>
              <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
                <h3 className='card-title align-items-start flex-column'>
                  <span className='fw-bolder text-dark fs-3'>Upload Transactions</span>
                </h3>
              </div>
              <div className='card-body'>
                {canAccessModule(Modules.USERS, userSession?.role || '') && (
                  <div className='row'>
                    <div className='col-md-6'>
                      <UsersAutocompleteField
                        users={users}
                        loading={loadingAllUsers}
                        onUserSelected={selectUserAsignement}
                        uploadSucces={reload}
                      />
                    </div>
                    <div className='col-md-6 d-flex justify-content-center'>
                      <div
                        className='alert alert-dismissible bg-light-dark d-flex flex-column justify-content-center align-items-center text-center p-5'
                        style={{width: '100%'}}
                      >
                        <h5 className='mb-3'>{textAlert}</h5>
                        {user?.label && (
                          <p className='mb-0 fw-semibold text-gray-600'>{user.label}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className='row'>
                  <div className='col-md-12'>
                    <UploadClaimsTransactionsFile
                      onUploadSuccess={reloadTransactions}
                      user={user}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {isGridTransacctions && (
          <ClaimTransactionsTable
            data={transactions}
            loading={loadingTrans}
            setPage={setPage}
            totalCount={count}
            page={page}
          />
        )}
        {isGridActions && <ClaimsActionsGrid data={actions || []} loading={loadingAct} />}
      </div>
    </div>
  )
}

export default ClaimsPage
