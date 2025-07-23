import UploadClaimsTransactionsFile from './components/UploadClaimsTransactionsFile'
import {useLocation} from 'react-router-dom'
import {useActionsClaim} from '../../hooks/claims/useClaimActions'
import {useTransactionsClaim} from '../../hooks/claims/useClaimTransactions'
import {useState} from 'react'
import ClaimsActionsGrid from './components/ClaimsActionsGrid'
import ClaimTransactionsTable from './components/ClaimsTransactionsGrid'
import {useTransactionsLogs} from '../../hooks/claims/useClaimTransactionsLogs'

const ClaimsPage = () => {
  const location = useLocation()
  const isUpload = location.pathname.includes('/claims/upload-transactions')
  const isGridActions = location.pathname.includes('claims/actions')
  const isGridTransacctions = location.pathname.includes('claims/transactions')
  const [reload, setReload] = useState<number>(Math.random() * 50)
  const [guidUpload, setGuidUpload] = useState<string>('')

  /* const {logs} = useTransactionsLogs(guidUpload) */

  const {actions, loading: loadingAct, error} = useActionsClaim()
  const {
    transactions,
    loading: loadingTrans,
    page,
    setPage,
    count,
  } = useTransactionsClaim(1, reload)

  const reloadTransactions = (newValue: number, guid:string) => {
    setReload(newValue * 100)
    setGuidUpload(guid)
  }
  
  return (
    <div className='card mb-10'>
      <div className='card-body'>
        {isUpload && <UploadClaimsTransactionsFile onUploadSuccess={reloadTransactions} />}
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
