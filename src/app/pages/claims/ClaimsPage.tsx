import UploadClaimsTransactionsFile from './components/UploadClaimsTransactionsFile'
import {useLocation} from 'react-router-dom'
import {useActionsClaim} from '../../hooks/claims/useClaimActions'
import {useTransactionsClaim} from '../../hooks/claims/useClaimTransactions'
import {useState} from 'react'
import ClaimsActionsGrid from './components/ClaimsActionsGrid'
import ClaimTransactionsTable from './components/ClaimsTransactionsGrid'

const ClaimsPage = () => {
  const location = useLocation()
  const isUpload = location.pathname.includes('/claims/upload-transactions')
  const isGridActions = location.pathname.includes('claims/actions')
  const isGridTransacctions = location.pathname.includes('claims/transactions')
  const [reload, setReload] = useState<number>(Math.random() * 50)

  const {actions, loading: loadingAct, error} = useActionsClaim()
  const {
    transactions,
    loading: loadingTrans,
    page,
    setPage,
    count,
    pageSize,
  } = useTransactionsClaim(1, reload)

  const reloadTransactions = (newValue: number) => {
    setReload(newValue * 100)
  }

  return (
    <div className='card mb-10'>
      <div className='card-body'>
        {isUpload && <UploadClaimsTransactionsFile onUploadSuccess={reloadTransactions} />}
        {isGridTransacctions && (
          <ClaimTransactionsTable
            data={transactions}
            loading={loadingTrans}
            page={page}
            setPage={setPage}
            totalCount={count}
            pageSize={pageSize}
          />
        )}
        {isGridActions && <ClaimsActionsGrid data={actions || []} loading={loadingAct} />}
      </div>
    </div>
  )
}

export default ClaimsPage
